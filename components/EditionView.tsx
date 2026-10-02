import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { TrendImage } from "@/components/TrendImage";
import { formatEditionDate, formatTimestamp } from "@/lib/format";
import type { Edition, Post } from "@/lib/types";

function storyHref(date: string, post: Post) {
  return `/blog/${date}/${post.slug}`;
}

export function EditionView({ edition, live = false }: { edition: Edition; live?: boolean }) {
  const [lead, ...rest] = edition.posts;
  const dateLabel = formatEditionDate(edition.date);
  const fetchedLabel = formatTimestamp(edition.fetchedAt);

  return (
    <>
      <SiteHeader size="hero" dateLabel={dateLabel} live={live} fetchedLabel={fetchedLabel} />
      <main className="wrap">
        {lead ? (
          <article className="lead">
            <div className="media">
              <TrendImage src={lead.image} alt={lead.title} />
              <span className="badge">01</span>
            </div>
            <div className="lead-copy">
              <p className="kicker">
                <span>Lead story</span>
                {lead.trafficLabel ? <em>{lead.trafficLabel}</em> : null}
              </p>
              <h2>
                <Link href={storyHref(edition.date, lead)}>{lead.title}</Link>
              </h2>
              <p className="dek">{lead.angle}</p>
              <Link className="text-link" href={storyHref(edition.date, lead)}>
                Read the story
              </Link>
            </div>
          </article>
        ) : (
          <p className="empty">This edition has no searches yet.</p>
        )}

        <nav className="rail" aria-label="Searches in this edition">
          {edition.posts.map((post) => (
            <Link key={post.slug} href={storyHref(edition.date, post)}>
              <span>{String(post.rank).padStart(2, "0")}</span>
              {post.title}
            </Link>
          ))}
        </nav>

        {rest.length > 0 ? (
          <section className="grid" aria-label="More rising searches">
            <header className="section-head">
              <h2>The rest of the edition</h2>
              <p>{rest.length} more searches, ranked by volume</p>
            </header>
            {rest.map((post) => (
              <article className="card" key={post.slug}>
                <Link href={storyHref(edition.date, post)} className="card-link">
                  <span className="media">
                    <TrendImage src={post.image} alt="" />
                    <span className="badge">{String(post.rank).padStart(2, "0")}</span>
                    {post.trafficLabel ? <span className="pill">{post.trafficLabel}</span> : null}
                  </span>
                  <h3>{post.title}</h3>
                  <p className="angle">{post.angle}</p>
                </Link>
              </article>
            ))}
          </section>
        ) : null}
      </main>
    </>
  );
}
