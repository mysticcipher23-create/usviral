import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { TrendImage } from "@/components/TrendImage";
import { formatEditionDate, isDateKey } from "@/lib/format";
import { loadEdition } from "@/lib/trends";

export const dynamic = "force-dynamic";

async function loadPost(date: string, slug: string) {
  if (!isDateKey(date)) return null;
  const edition = await loadEdition(date);
  if (!edition) return null;
  const post = edition.posts.find((item) => item.slug === slug);
  if (!post) return null;
  return { edition, post };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ date: string; slug: string }>;
}): Promise<Metadata> {
  const { date, slug } = await params;
  const loaded = await loadPost(date, slug);
  if (!loaded) return { title: "Brief not found" };
  return {
    title: loaded.post.headline || loaded.post.title,
    description: loaded.post.dek,
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ date: string; slug: string }>;
}) {
  const { date, slug } = await params;
  const loaded = await loadPost(date, slug);
  if (!loaded) notFound();

  const { edition, post } = loaded;
  const others = edition.posts.filter((item) => item.slug !== post.slug).slice(0, 4);

  return (
    <>
      <SiteHeader size="compact" dateLabel={formatEditionDate(edition.date)} />
      <main className="wrap story">
        <div className="story-head">
          <p className="back">
            <Link href={edition.date ? `/archive/${edition.date}` : "/"}>
              {formatEditionDate(edition.date)}
            </Link>
          </p>
          <p className="kicker">
            <span>{String(post.rank).padStart(2, "0")}</span>
            {post.headline && post.headline !== post.title ? post.query : "United States"}
            {post.trafficLabel ? <em>{post.trafficLabel} searches</em> : null}
          </p>
          <h1>{post.headline || post.title}</h1>
          <p className="dek">{post.dek}</p>
        </div>
        <TrendImage src={post.image} alt={post.headline || post.title} />

        <div className="story-copy">
          <div className="post-body">
          {post.blocks.map((block, index) => {
            if (block.type === "h2") return <h2 key={index}>{block.text}</h2>;
            if (block.type === "quote") {
              return (
                <blockquote key={index}>
                  <p>{block.text}</p>
                  {block.caption ? <footer>{block.caption}</footer> : null}
                </blockquote>
              );
            }
            return <p key={index}>{block.text}</p>;
          })}
          </div>
        </div>
        {others.length > 0 ? (
          <section className="related" aria-label="More from this edition">
            <h2>More from this edition</h2>
            <ul>
              {others.map((item) => (
                <li key={item.slug}>
                  <Link href={`/blog/${edition.date}/${item.slug}`}>
                    <TrendImage src={item.image} alt="" />
                    <span>{String(item.rank).padStart(2, "0")}</span>
                    <strong>{item.title}</strong>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>
    </>
  );
}
