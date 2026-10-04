"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="wrap page">
      <p className="kicker">
        <span>Feed</span>
        Could not load
      </p>
      <h1 className="page-title">The edition did not come through.</h1>
      <p className="empty">
        {error.message.includes("Minified React error")
          ? "The daily feed could not be reached. Open the current edition again in a moment."
          : error.message}
      </p>
      <button className="refresh dark" type="button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
