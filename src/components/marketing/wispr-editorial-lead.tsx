import { cn } from "@/lib/utils";

/** Shared lead block for #story and #memos — matches hero mono strips + GSPA type rhythm (.21st/DESIGN.md). */
export function WisprEditorialLead({
  eyebrow,
  title,
  description,
  byline,
  align = "left",
  titleId,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  byline?: string;
  align?: "left" | "center";
  titleId?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-[680px]",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        {align === "left" ? (
          <span className="h-px w-7 bg-current" aria-hidden />
        ) : null}
        {eyebrow}
        {align === "center" ? (
          <span className="h-px w-7 bg-current" aria-hidden />
        ) : null}
      </p>
      <h2
        id={titleId}
        className="mt-4 font-display text-balance text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.08] tracking-tight text-text"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-pretty text-[15px] leading-[1.65] text-muted sm:text-base">
          {description}
        </p>
      ) : null}
      {byline ? <p className="mt-3 text-sm text-muted">{byline}</p> : null}
    </div>
  );
}
