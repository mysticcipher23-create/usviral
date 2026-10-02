import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader size="compact" dateLabel="Missing page" />
      <main className="wrap page">
        <h1 className="page-title">That brief is not in the archive.</h1>
        <p className="empty">
          <Link href="/">Back to today&apos;s edition</Link>
        </p>
      </main>
    </>
  );
}
