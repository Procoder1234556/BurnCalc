export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-5">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-1 text-xl font-bold leading-tight tracking-tight text-text sm:text-2xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-1.5 max-w-prose text-sm leading-relaxed text-muted">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
