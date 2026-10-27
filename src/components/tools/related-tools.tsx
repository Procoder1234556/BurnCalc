import Link from "next/link";
import { ToolIcon } from "@/components/marketing/tool-icon";
import { TOOLS, type ToolDefinition } from "@/data/tools-catalog";

export function RelatedTools({
  current,
  limit = 4,
}: {
  current: ToolDefinition;
  limit?: number;
}) {
  const related = TOOLS.filter(
    (t) => t.slug !== current.slug && t.category === current.category,
  ).slice(0, limit);

  const fallback =
    related.length >= 2
      ? related
      : TOOLS.filter((t) => t.slug !== current.slug).slice(0, limit);

  return (
    <div>
      <h2 className="text-lg font-semibold text-text">Related calculators</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {fallback.map((tool) => (
          <li key={tool.slug}>
            <Link
              href={`/tools/${tool.slug}`}
              className="flex items-center gap-3 rounded-lg border border-border bg-white p-3 transition-colors hover:border-primary/30"
            >
              <span
                className="flex size-9 shrink-0 items-center justify-center rounded-md text-white"
                style={{ backgroundColor: tool.accent }}
              >
                <ToolIcon name={tool.icon} className="size-4" />
              </span>
              <span className="text-sm font-medium text-text">{tool.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
