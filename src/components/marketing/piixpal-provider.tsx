"use client";

import Script from "next/script";

const PIIXPAL_SRC = "https://piixpal.dvkk.dev/piixpal.js?v=5a9c3792";

export function PiixpalProvider() {
  return (
    <Script src={PIIXPAL_SRC} strategy="lazyOnload" crossOrigin="anonymous" />
  );
}
