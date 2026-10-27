"use client";

import { useEffect, useState } from "react";

const METRICS = [
  { label: "Monthly burn", value: "$125K", tone: "burn" as const },
  { label: "Runway", value: "19.2 mo", tone: "runway" as const },
  { label: "LTV : CAC", value: "4.06×", tone: "neutral" as const },
  { label: "Rule of 40", value: "38%", tone: "neutral" as const },
];

export function HeroDealTape() {
  const [runwayPct, setRunwayPct] = useState(72);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const id = window.setInterval(() => {
      setRunwayPct((p) => (p <= 18 ? 72 : p - 0.35));
    }, 80);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="deal-tape-panel relative overflow-hidden rounded-xl border border-border bg-paper-elevated shadow-[0_24px_80px_-24px_rgba(15,23,42,0.18)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        aria-hidden
      >
        <div className="chart-grid h-full w-full" />
      </div>

      <div className="relative border-b border-border px-5 py-3">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-ink-muted">
            Deal snapshot · live preview
          </p>
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-positive">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-positive opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-positive" />
            </span>
            Updating
          </span>
        </div>
      </div>

      <div className="relative space-y-6 p-5 sm:p-6">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-xs font-medium text-ink-muted">Runway remaining</p>
            <p className="font-mono text-sm tabular-nums text-ink">19.2 months</p>
          </div>
          <div
            className="mt-2 h-2 overflow-hidden rounded-full bg-border"
            role="img"
            aria-label="Illustrative runway bar depleting over time"
          >
            <div
              className="runway-bar h-full rounded-full transition-[width] duration-150 ease-linear"
              style={{ width: `${runwayPct}%` }}
            />
          </div>
          <p className="mt-2 font-mono text-[10px] text-ink-muted">
            Cash $2.4M ÷ burn $125K/mo · demo inputs
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="rounded-lg border border-border/80 bg-paper/80 px-3 py-2.5 backdrop-blur-sm"
            >
              <dt className="text-[10px] font-medium uppercase tracking-wide text-ink-muted">
                {m.label}
              </dt>
              <dd
                className={`mt-0.5 font-mono text-lg tabular-nums ${
                  m.tone === "burn"
                    ? "text-burn"
                    : m.tone === "runway"
                      ? "text-runway"
                      : "text-ink"
                }`}
              >
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
