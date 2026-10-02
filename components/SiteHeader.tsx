import Link from "next/link";
import { RefreshForm } from "@/components/RefreshForm";

export function SiteHeader({
  size,
  dateLabel,
  live = false,
  fetchedLabel,
}: {
  size: "hero" | "compact";
  dateLabel: string;
  live?: boolean;
  fetchedLabel?: string;
}) {
  return (
    <header className={`mast ${size}`}>
      <div className="wrap">
        <div className="eyebrow">
          <span>United States · Past 24 hours</span>
          <span>{dateLabel}</span>
        </div>
        <div className="mast-row">
          <Link href="/" className="wordmark">
            US<em>Viral</em>
          </Link>
          <nav className="nav" aria-label="Site">
            <Link href="/">Today</Link>
            <Link href="/archive">Archive</Link>
          </nav>
        </div>
        {size === "hero" ? (
          <p className="tagline">
            The 25 biggest US searches of the past 24 hours, ranked by volume, each filed as a short blog.
          </p>
        ) : null}
      </div>
      <div className="ticker">
        <div className="wrap">
          <p>
            Google Trends
            <span> · Top 25 by search volume</span>
            {fetchedLabel ? <span> · Pulled {fetchedLabel}</span> : null}
          </p>
          {live ? <RefreshForm /> : <Link href="/">Current edition</Link>}
        </div>
      </div>
    </header>
  );
}
