const SMALL_WORDS = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "of",
  "in",
  "on",
  "for",
  "to",
  "vs",
  "v",
  "at",
  "by",
  "from",
]);

export function easternDate(date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function formatEditionDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const noonEastern = new Date(Date.UTC(year, month - 1, day, 16, 0, 0));
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  }).format(noonEastern);
}

export function formatTimestamp(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
    timeZoneName: "short",
  }).format(date);
}

export function formatPubDate(raw: string): string {
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
    timeZoneName: "short",
  }).format(date);
}

export function titleCase(input: string): string {
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

export function formatTraffic(raw: string): string {
  const digits = raw.replace(/[^0-9]/g, "");
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

export function trafficScore(raw: string): number {
  const digits = raw.replace(/[^0-9]/g, "");
  const value = Number(digits);
  return Number.isFinite(value) ? value : 0;
}

export function slugify(input: string): string {
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

export function isDateKey(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}
