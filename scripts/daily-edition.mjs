import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { paintCover } from "./cover-art.mjs";

const BATCH_URL = "https://trends.google.com/_/TrendsUi/data/batchexecute";
const TRENDING_RPC = "i0OFE";
const NEWS_RPC = "w4opAf";
const SOURCE_URL = "https://trends.google.com/trending?geo=US&hours=24&sort=search-volume";
const TOP_LIMIT = 25;
const SMALL_WORDS = new Set([
  "a", "an", "the", "and", "or", "of", "in", "on", "for", "to", "vs", "v", "at", "by", "from",
]);

const HEADERS = {
  Accept: "*/*",
  "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  Origin: "https://trends.google.com",
  Referer: "https://trends.google.com/trending?geo=US&hours=24",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
};

function easternDate(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function titleCase(input) {
  return input
    .split(/\s+/)
    .filter(Boolean)
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index > 0 && SMALL_WORDS.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

function formatTraffic(raw) {
  const digits = String(raw).replace(/[^0-9]/g, "");
  if (!digits) return "";
  const value = Number(digits);
  if (!Number.isFinite(value)) return "";
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    const text = Number.isInteger(millions) ? String(millions) : String(Math.round(millions * 10) / 10);
    return `${text}M+`;
  }
  if (value >= 1_000) {
    const thousands = value / 1_000;
    const text = Number.isInteger(thousands) ? String(thousands) : String(Math.round(thousands * 10) / 10);
    return `${text}K+`;
  }
  return `${value.toLocaleString("en-US")}+`;
}

function slugify(input) {
  const slug = input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return slug || "trend";
}

function uniqueSlug(base, used) {
  let slug = base;
  let n = 2;
  while (used.has(slug)) slug = `${base}-${n++}`;
  used.add(slug);
  return slug;
}

function extractJsonArrays(source) {
  const arrays = [];
  for (let index = 0; index < source.length; index += 1) {
    if (source[index] !== "[") continue;
    let depth = 0;
    let inString = false;
    let escaped = false;
    const start = index;
    for (; index < source.length; index += 1) {
      const char = source[index];
      if (inString) {
        if (escaped) escaped = false;
        else if (char === "\\") escaped = true;
        else if (char === '"') inString = false;
        continue;
      }
      if (char === '"') inString = true;
      else if (char === "[") depth += 1;
      else if (char === "]") {
        depth -= 1;
        if (depth === 0) {
          arrays.push(source.slice(start, index + 1));
          break;
        }
      }
    }
  }
  return arrays;
}

function parseBatchexecute(text, rpcId) {
  const trimmed = text.trim();
  const body = trimmed.startsWith(")]}'") ? trimmed.slice(4) : trimmed;
  for (const chunk of extractJsonArrays(body)) {
    try {
      const parsed = JSON.parse(chunk);
      if (!Array.isArray(parsed)) continue;
      const entry = parsed.find(
        (candidate) =>
          Array.isArray(candidate) && candidate.length >= 3 && candidate[0] === "wrb.fr" && candidate[1] === rpcId,
      );
      if (Array.isArray(entry) && typeof entry[2] === "string") return JSON.parse(entry[2]);
    } catch {
      // Length-prefix lines and unrelated chunks are skipped.
    }
  }
  throw new Error("Google Trends did not return the trending list.");
}

async function postRpc(rpcId, inner) {
  const query = new URLSearchParams({
    rpcids: rpcId,
    "source-path": "/trending",
    hl: "en-US",
  });
  const body = new URLSearchParams({
    "f.req": JSON.stringify([[[rpcId, JSON.stringify(inner), null, "generic"]]]),
  });
  const response = await fetch(`${BATCH_URL}?${query}`, {
    method: "POST",
    headers: HEADERS,
    body,
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error(`Google Trends returned ${response.status}.`);
  return parseBatchexecute(await response.text(), rpcId);
}

function timestampFrom(value) {
  const seconds = Array.isArray(value) ? Number(value[0]) : Number(value);
  if (!Number.isFinite(seconds) || seconds <= 0) return "";
  return new Date(seconds * 1000).toISOString();
}

function newsRefsFrom(value) {
  if (!Array.isArray(value)) return [];
  return value.flatMap((ref) => {
    if (!Array.isArray(ref) || !Number.isFinite(Number(ref[0]))) return [];
    return [[Number(ref[0]), String(ref[1] ?? "en"), String(ref[2] ?? "US")]];
  });
}

function parseTrendRows(payload) {
  const rows = Array.isArray(payload) && Array.isArray(payload[1]) ? payload[1] : [];
  return rows
    .filter((row) => Array.isArray(row) && typeof row[0] === "string")
    .map((row) => ({
      query: String(row[0]),
      volume: Number(row[6]) || 0,
      growth: Number(row[8]) || 0,
      startedAt: timestampFrom(row[3]),
      newsRefs: newsRefsFrom(row[11]),
    }));
}

function articlesFrom(payload) {
  const list = Array.isArray(payload) && Array.isArray(payload[0]) ? payload[0] : [];
  return list.flatMap((article) => {
    if (!Array.isArray(article) || typeof article[0] !== "string") return [];
    return [article[0]];
  });
}

async function fetchNews(refs) {
  const english = refs.filter((ref) => ref[1] === "en");
  const chosen = (english.length > 0 ? english : refs).slice(0, 8);
  if (chosen.length === 0) return [];
  try {
    const payload = await postRpc(NEWS_RPC, [chosen, 3]);
    return articlesFrom(payload).slice(0, 3);
  } catch {
    return [];
  }
}

async function mapPool(items, limit, task) {
  const results = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await task(items[index]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
  return results;
}

function cleanFact(title) {
  return title
    .replace(/\s+/g, " ")
    .replace(/\s+[|\-–—]\s+[A-Z0-9][^|\-–—]{1,42}$/u, "")
    .replace(/[.\s]+$/g, "")
    .trim();
}

const WEAK_FACT = /how to watch|where to watch|what channel|join our|discussion|predictions|by the numbers|odds|preview|start time|tv channel|stream|lineup|injury report/i;

function factsFrom(headlines) {
  const seen = new Set();
  const facts = [];
  for (const headline of headlines) {
    const text = cleanFact(headline);
    const key = text.toLowerCase();
    if (text.length < 12 || seen.has(key)) continue;
    seen.add(key);
    facts.push(text);
  }
  const strong = facts.filter((fact) => !WEAK_FACT.test(fact));
  return (strong.length > 0 ? strong : facts).slice(0, 3);
}

function sentence(text) {
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

function writeStory(query, headlines) {
  const subject = titleCase(query);
  const facts = factsFrom(headlines);
  const lead = facts[0] ? sentence(facts[0]) : "";
  const rest = facts.slice(1).map(sentence);
  const versus = /\bvs\.?\b|\bv\b/i.test(query);

  if (!lead) {
    return {
      headline: subject,
      dek: `${subject} is one of the 25 biggest US searches of the past day. The accounts behind it were not in yet when this edition was filed.`,
      card: `${subject} is on the list. The detail is still thin.`,
      blocks: [
        {
          type: "p",
          text: `${subject} is one of the 25 biggest searches in the United States over the past 24 hours. The list is ranked by search volume. A full account of what happened was not attached to the search when this page was written, so this post does not guess at a result.`,
        },
        {
          type: "h2",
          text: "What is on the record",
        },
        {
          type: "p",
          text: `The words people are typing are “${query}.” Until a result, a name, or a number is actually reported, that phrase is the whole story. A later update can fill in the event. This one will not invent it.`,
        },
      ],
    };
  }

  return {
    headline: facts[0].length > 110 ? subject : facts[0],
    dek: lead,
    card: facts[0].length > 140 ? `${subject}. ${facts[0].slice(0, 120).trim()}…` : facts[0],
    blocks: [
      {
        type: "p",
        text: `${subject} is one of the 25 biggest searches in the United States today. ${lead}`,
      },
      {
        type: "h2",
        text: versus ? "The result people are checking" : "What is already on the record",
      },
      {
        type: "p",
        text:
          rest.length > 0
            ? rest.join(" ")
            : `That is the account available when the edition was filed. It is the event people are opening.`,
      },
      {
        type: "p",
        text: `People are searching “${query}.” This page stays with those accounts and does not add a score, a name, or an outcome that was not in them.`,
      },
    ],
  };
}

async function paintPostCover(post) {
  const dest = path.join("public", "covers", `${post.slug}.svg`);
  const jpg = path.join("public", "covers", `${post.slug}.jpg`);
  try {
    const bytes = await readFile(jpg);
    if (bytes.length > 150000 && bytes[0] === 0xff && bytes[1] === 0xd8) {
      post.image = `/covers/${post.slug}.jpg`;
      console.log(`cover kept ${post.slug}`);
      return;
    }
    await rm(jpg, { force: true });
  } catch {
    // No earlier photograph to replace.
  }
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, paintCover(post));
  post.image = `/covers/${post.slug}.svg`;
  console.log(`cover painted ${post.slug}`);
}

async function ensureCovers(posts) {
  for (const post of posts) {
    if (!post?.slug) continue;
    await paintPostCover(post);
  }
}

async function main() {
  const date = easternDate();
  const file = path.join("data", "editions", `${date}.json`);
  if (!process.env.FORCE_EDITION) {
    try {
      const existing = JSON.parse(await readFile(file, "utf8"));
      if (existing?.sort === "volume" && existing?.posts?.length > 0) {
        console.log(`${date} already has ${existing.posts.length} posts. Checking covers.`);
        await ensureCovers(existing.posts);
        await writeFile(file, `${JSON.stringify(existing, null, 2)}\n`);
        return;
      }
    } catch {
      // No edition for this Eastern date yet.
    }
  }

  const payload = await postRpc(TRENDING_RPC, [null, null, "US", 0, "en-US", 24, 2]);
  const ranked = parseTrendRows(payload)
    .filter((row) => row.query.trim())
    .sort((a, b) => b.volume - a.volume || b.growth - a.growth)
    .slice(0, TOP_LIMIT);

  if (ranked.length < 10) {
    throw new Error(`Only ${ranked.length} trends came back. Refusing to publish a short edition.`);
  }

  const news = await mapPool(ranked, 4, (row) => fetchNews(row.newsRefs));
  const used = new Set();
  const posts = ranked.map((row, index) => {
    const slug = uniqueSlug(slugify(row.query), used);
    const written = writeStory(row.query, news[index] ?? []);
    return {
      slug,
      query: row.query,
      title: titleCase(row.query),
      headline: written.headline,
      dek: written.dek,
      angle: written.card,
      traffic: String(row.volume),
      trafficLabel: formatTraffic(String(row.volume)),
      image: `/covers/${slug}.jpg`,
      imageSource: "",
      publishedAt: row.startedAt,
      publishedLabel: "",
      rank: index + 1,
      blocks: written.blocks,
      sources: [],
    };
  });

  const edition = {
    date,
    fetchedAt: new Date().toISOString(),
    geo: "US",
    window: "24h",
    sort: "volume",
    limit: 25,
    sourceUrl: SOURCE_URL,
    posts,
  };

  await mkdir(path.dirname(file), { recursive: true });
  await ensureCovers(posts);
  await writeFile(file, `${JSON.stringify(edition, null, 2)}\n`);
  console.log(`Wrote ${posts.length} posts to ${file}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
