import { formatTraffic, slugify, titleCase } from "@/lib/format";
import { STORIES } from "@/lib/stories";
import type { Block, NewsItem, Post } from "@/lib/types";

export type RawTrend = {
  query: string;
  traffic: string;
  growth?: number;
  image: string;
  imageSource: string;
  publishedAt: string;
  sources: NewsItem[];
};

function clean(title: string): string {
  return title.replace(/\s+/g, " ").replace(/[.\s]+$/, "").trim();
}

function writeFromNotes(query: string, notes: string[]) {
  const subject = titleCase(query);
  const facts = notes.map(clean).filter((note) => note.length > 0);
  const paragraphs = [
    `${subject} is one of the biggest searches in the United States today because something just broke, and people want it in one place.`,
  ];
  if (facts.length > 0) {
    paragraphs.push(
      `What holds up, once you put the accounts next to each other: ${facts.join(". ")}.`,
    );
  }
  paragraphs.push(
    `That is the story as it stands. The words in the search bar are “${query}.” Everything around them is the event, not a list of other people’s headlines.`,
  );
  return {
    headline: subject,
    dek: facts[0] ? `${subject}. ${facts[0]}.` : `${subject} is moving through US search today.`,
    card: `${subject} is one of the 25 biggest US searches of the past day.`,
    blocks: paragraphs.map((text) => ({ type: "p" as const, text })),
  };
}

export function composePost(trend: RawTrend, rank: number): Post {
  const slug = slugify(trend.query);
  const title = titleCase(trend.query);
  const trafficLabel = formatTraffic(trend.traffic);
  const written =
    STORIES[slug] ??
    writeFromNotes(
      trend.query,
      trend.sources.map((source) => source.title),
    );
  const blocks: Block[] = written.blocks.map((block) =>
    block.type === "h2" ? { type: "h2", text: block.text } : { type: "p", text: block.text },
  );

  return {
    slug,
    query: trend.query,
    title,
    headline: written.headline,
    dek: written.dek,
    angle: written.card,
    traffic: trend.traffic,
    trafficLabel,
    image: `/covers/${slug}.jpg`,
    imageSource: "",
    publishedAt: trend.publishedAt,
    publishedLabel: "",
    rank,
    blocks,
    sources: [],
  };
}

export function uniqueSlug(base: string, used: Set<string>): string {
  let slug = base;
  let n = 2;
  while (used.has(slug)) slug = `${base}-${n++}`;
  used.add(slug);
  return slug;
}
