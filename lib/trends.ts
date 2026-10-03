import { composePost, uniqueSlug, type RawTrend } from "@/lib/compose";
import { STORIES } from "@/lib/stories";
import { easternDate, trafficScore } from "@/lib/format";
import { listEditions, readEdition, writeEdition } from "@/lib/store";
import type { Edition, NewsItem } from "@/lib/types";

const BATCH_URL = "https://trends.google.com/_/TrendsUi/data/batchexecute";
const TRENDING_RPC = "i0OFE";
const NEWS_RPC = "w4opAf";
const SOURCE_URL = "https://trends.google.com/trending?geo=US&hours=24&sort=search-volume";
const TOP_LIMIT = 25;

const HEADERS = {
  Accept: "*/*",
  "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  Origin: "https://trends.google.com",
  Referer: "https://trends.google.com/trending?geo=US&hours=24",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
};

type TrendRow = {
  query: string;
  volume: number;
  growth: number;
  startedAt: string;
  newsRefs: Array<[number, string, string]>;
};

function extractJsonArrays(source: string): string[] {
  const arrays: string[] = [];
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

function parseBatchexecute(text: string, rpcId: string): unknown {
  const trimmed = text.trim();
  const body = trimmed.startsWith(")]}'") ? trimmed.slice(4) : trimmed;
  for (const chunk of extractJsonArrays(body)) {
    try {
      const parsed = JSON.parse(chunk) as unknown;
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

async function postRpc(rpcId: string, inner: unknown): Promise<unknown> {
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
    cache: "no-store",
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) {
    throw new Error(`Google Trends returned ${response.status}. The daily edition could not be pulled.`);
  }
  return parseBatchexecute(await response.text(), rpcId);
}

function asRows(payload: unknown): unknown[][] {
  if (!Array.isArray(payload) || !Array.isArray(payload[1])) return [];
  return payload[1].filter((row): row is unknown[] => Array.isArray(row) && typeof row[0] === "string");
}

function timestampFrom(value: unknown): string {
  const seconds = Array.isArray(value) ? Number(value[0]) : Number(value);
  if (!Number.isFinite(seconds) || seconds <= 0) return "";
  return new Date(seconds * 1000).toISOString();
}

function newsRefsFrom(value: unknown): Array<[number, string, string]> {
  if (!Array.isArray(value)) return [];
  return value.flatMap((ref) => {
    if (!Array.isArray(ref) || !Number.isFinite(Number(ref[0]))) return [];
    return [[Number(ref[0]), String(ref[1] ?? "en"), String(ref[2] ?? "US")] as [number, string, string]];
  });
}

function parseTrendRows(payload: unknown): TrendRow[] {
  return asRows(payload).map((row) => ({
    query: String(row[0]),
    volume: Number(row[6]) || 0,
    growth: Number(row[8]) || 0,
    startedAt: timestampFrom(row[3]),
    newsRefs: newsRefsFrom(row[11]),
  }));
}

function articlesFrom(payload: unknown): NewsItem[] {
  const list = Array.isArray(payload) && Array.isArray(payload[0]) ? payload[0] : [];
  return list.flatMap((article) => {
    if (!Array.isArray(article) || typeof article[0] !== "string" || typeof article[1] !== "string") return [];
    return [
      {
        title: article[0],
        snippet: "",
        url: article[1],
        source: typeof article[2] === "string" && article[2] ? article[2] : "Source",
        image: typeof article[4] === "string" ? article[4] : "",
      },
    ];
  });
}

async function fetchNews(refs: Array<[number, string, string]>): Promise<NewsItem[]> {
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

async function mapPool<T, R>(items: T[], limit: number, task: (item: T) => Promise<R>): Promise<R[]> {
  const results = new Array<R>(items.length);
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

export async function fetchTrends(): Promise<RawTrend[]> {
  const payload = await postRpc(TRENDING_RPC, [null, null, "US", 0, "en-US", 24, 2]);
  const ranked = parseTrendRows(payload)
    .filter((row) => row.query.trim())
    .sort((a, b) => b.volume - a.volume || b.growth - a.growth)
    .slice(0, TOP_LIMIT);

  if (ranked.length === 0) {
    throw new Error("The US trending list came back empty.");
  }

  const news = await mapPool(ranked, 6, (row) => fetchNews(row.newsRefs));

  return ranked.map((row, index) => {
    const sources = news[index] ?? [];
    const lead = sources[0];
    return {
      query: row.query,
      traffic: String(row.volume),
      growth: row.growth,
      image: lead?.image ?? "",
      imageSource: lead?.source ?? "",
      publishedAt: row.startedAt,
      sources,
    };
  });
}

export function buildPosts(trends: RawTrend[]): Edition["posts"] {
  const ranked = [...trends].sort((a, b) => trafficScore(b.traffic) - trafficScore(a.traffic));
  const used = new Set<string>();
  return ranked.slice(0, TOP_LIMIT).map((trend, index) => {
    const post = composePost(trend, index + 1);
    post.slug = uniqueSlug(post.slug, used);
    return post;
  });
}

export async function buildEdition(): Promise<Edition> {
  const trends = await fetchTrends();
  const edition: Edition = {
    date: easternDate(),
    fetchedAt: new Date().toISOString(),
    geo: "US",
    window: "24h",
    sort: "volume",
    limit: 25,
    sourceUrl: SOURCE_URL,
    posts: buildPosts(trends),
  };
  await writeEdition(edition);
  return edition;
}

function isVolumeEdition(edition: Edition | null): edition is Edition {
  return Boolean(edition && edition.sort === "volume" && edition.limit === 25 && edition.posts.length > 0);
}

function storyText(slug: string): string | null {
  const story = STORIES[slug];
  if (!story) return null;
  return story.blocks.map((block) => (block.type === "h2" ? `## ${block.text}` : block.text)).join("\n");
}

function postText(post: Edition["posts"][number]): string {
  return post.blocks
    .map((block) => {
      if (block.type === "h2") return `## ${block.text}`;
      if (block.type === "quote") return block.text;
      return block.text;
    })
    .join("\n");
}

function stillUsesOldBrief(edition: Edition): boolean {
  return edition.posts.some((post) => {
    const fresh = storyText(post.slug);
    if (fresh && fresh !== postText(post)) return true;
    return (
      !post.image.startsWith("/covers/") ||
      post.blocks.some(
        (block) =>
          (block.type === "h2" && block.text === "Why this search is moving") ||
          (block.type === "p" && /comes in beside it|headline above is theirs/.test(block.text)),
      )
    );
  });
}

function rewritePosts(edition: Edition): Edition {
  return {
    ...edition,
    posts: edition.posts.map((post) => {
      const next = composePost(
        {
          query: post.query,
          traffic: post.traffic,
          image: post.image,
          imageSource: post.imageSource,
          publishedAt: post.publishedAt,
          sources: post.sources,
        },
        post.rank,
      );
      next.slug = post.slug;
      return next;
    }),
  };
}

export async function loadEdition(date: string): Promise<Edition | null> {
  const existing = await readEdition(date);
  if (!existing || !stillUsesOldBrief(existing)) return existing;
  const rewritten = rewritePosts(existing);
  await writeEdition(rewritten);
  return rewritten;
}

export async function loadToday(): Promise<Edition> {
  const date = easternDate();
  const existing = await loadEdition(date);
  if (isVolumeEdition(existing)) return existing;

  const saved = await listEditions();
  if (isVolumeEdition(saved[0])) return saved[0];

  return buildEdition();
}
