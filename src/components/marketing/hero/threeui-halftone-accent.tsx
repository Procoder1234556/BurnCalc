"use client";

import "@designcodeio/threeui/style.css";
import dynamic from "next/dynamic";

const AmberHalftone = dynamic(
  () =>
    import("@designcodeio/threeui/components/AmberHalftone").then(
      (mod) => mod.AmberHalftone,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-full w-full animate-pulse rounded-xl bg-surface-muted/80"
        aria-hidden
      />
    ),
  },
);

/** threeui.com — halftone analytics motif (Community: AmberHalftone). */
export function ThreeUiHalftoneAccent() {
  return (
    <div className="relative h-[220px] w-full overflow-hidden rounded-xl border border-border/80 bg-background/60 shadow-sm sm:h-[260px]">
      <div className="absolute inset-0 opacity-90 [&_canvas]:!h-full [&_canvas]:!w-full">
        <AmberHalftone />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
      <p className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-widest text-muted">
        Live metric field
      </p>
    </div>
  );
}
