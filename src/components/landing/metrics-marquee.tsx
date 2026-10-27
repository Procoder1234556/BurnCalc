const METRIC_NAMES = [
  "Monthly burn",
  "Runway",
  "Net burn",
  "Gross margin",
  "MoM growth",
  "YoY growth",
  "CAC",
  "LTV",
  "LTV : CAC",
  "Payback",
  "Rule of 40",
  "Dilution",
  "Post-money",
  "P/E ratio",
];

export function MetricsMarquee() {
  const row = METRIC_NAMES.join(" · ");

  return (
    <section
      aria-label="Metrics covered"
      className="border-y border-border bg-ink py-3 text-paper"
    >
      <div className="marquee-mask overflow-hidden">
        <p
          className="marquee-track whitespace-nowrap font-mono text-xs tracking-wide text-paper/85"
          aria-hidden
        >
          {row} · {row}
        </p>
      </div>
      <p className="sr-only">{METRIC_NAMES.join(", ")}</p>
    </section>
  );
}
