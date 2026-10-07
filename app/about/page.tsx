import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "About",
  description: "What USViral is, how each daily edition is made, and what the site is not.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader size="compact" dateLabel="About the publication" />
      <main className="wrap page">
        <p className="kicker">
          <span>USViral</span>
          An independent daily
        </p>
        <h1 className="page-title">About us</h1>
        <div className="sheet">
          <p>
            USViral publishes one edition a day. Each edition is the 25 United States searches with
            the highest volume over the past 24 hours, and each search gets its own original blog.
          </p>
          <h2>How an edition is made</h2>
          <p>
            The list comes from the public Google Trends view for the United States, past 24 hours,
            sorted by search volume. The edition date follows US Eastern time. A scheduled job
            files the next edition each morning, so the site does not depend on anyone leaving a
            computer on.
          </p>
          <p>
            The blogs are written from the public accounts attached to those searches. A score, a
            name, or an outcome that was not in those accounts is left out. USViral does not
            republish another outlet&apos;s article and does not tag other publications.
          </p>
          <h2>The pictures</h2>
          <p>
            Each story gets an original photorealistic scene made for that report. They are not
            news photographs. They do not use real people&apos;s faces, logos, or words. A new
            edition&apos;s pictures are generated with the page, one scene for each story.
          </p>
          <h2>What this site is not</h2>
          <p>
            USViral is not affiliated with, endorsed by, or sponsored by Google. Google Trends is
            the public list the edition is drawn from. The name USViral is the publication, not a
            Google product.
          </p>
          <p>
            The site may show advertising through Google AdSense. Ads are labeled by Google. They
            are not part of the reporting.
          </p>
        </div>
      </main>
    </>
  );
}
