"use client";

import { useState } from "react";

export function TrendImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  const [failed, setFailed] = useState(!src);

  return (
    <figure className="frame">
      {failed ? (
        <div className="frame-fallback" aria-hidden="true">
          <span>{alt.slice(0, 1).toUpperCase()}</span>
        </div>
      ) : (
        // Google hosts these trend stills. A plain img avoids the image optimizer blocking unknown hosts.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} onError={() => setFailed(true)} />
      )}
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
