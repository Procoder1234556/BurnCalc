export function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-baseline gap-3 border-b border-border pb-2">
      <h2 className="font-display text-lg font-semibold text-text">{title}</h2>
      {subtitle ? (
        <span className="text-xs text-muted">{subtitle}</span>
      ) : null}
    </div>
  );
}
