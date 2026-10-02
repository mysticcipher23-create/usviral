export type NewsItem = {
  title: string;
  snippet: string;
  url: string;
  source: string;
  image: string;
};

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; caption: string };

export type Post = {
  slug: string;
  query: string;
  title: string;
  headline: string;
  dek: string;
  angle: string;
  traffic: string;
  trafficLabel: string;
  image: string;
  imageSource: string;
  publishedAt: string;
  publishedLabel: string;
  rank: number;
  blocks: Block[];
  sources: NewsItem[];
};

export type Edition = {
  date: string;
  fetchedAt: string;
  geo: "US";
  window: "24h";
  sort: "volume";
  limit: 25;
  sourceUrl: string;
  posts: Post[];
};
