import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { formatEditionDate, formatTimestamp } from "@/lib/format";
import { listEditions } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Archive",
};

export default async function ArchivePage() {
  const editions = await listEditions();

  return (
    <>
      <SiteHeader size="compact" dateLabel="Saved editions" />
      <main className="wrap page">
        <p className="kicker">
          <span>Daily</span>
          One file for each US day
        </p>
        <h1 className="page-title">Archive</h1>
        {editions.length === 0 ? (
          <p className="empty">No editions have been saved yet. Open today&apos;s page to pull the feed.</p>
        ) : (
          <ul className="archive-list">
            {editions.map((edition) => (
              <li key={edition.date}>
                <Link href={`/archive/${edition.date}`}>
                  <span>{formatEditionDate(edition.date)}</span>
                  <strong>{edition.posts[0]?.title ?? "Untitled edition"}</strong>
                  <em>
                    {edition.posts.length} stories · pulled {formatTimestamp(edition.fetchedAt)}
                  </em>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
