"use client";

import { useEffect, useRef } from "react";

/**
 * dvklab "Halftone" template background (Hacktemplates / dvklab.vercel.app).
 * Loads public/hero/halftone-bg.js against a canvas[data-bg] inside the hero.
 */
export function DvklabHalftoneCanvas() {
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    const script = document.createElement("script");
    script.src = "/hero/halftone-bg.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
      loadedRef.current = false;
    };
  }, []);

  return (
    <canvas
      data-bg
      data-cell="10"
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 block h-full w-full"
      style={{
        background:
          "linear-gradient(180deg, var(--color-surface-muted) 40%, #2d8a4e 41%, #1a1a1a)",
      }}
    />
  );
}
