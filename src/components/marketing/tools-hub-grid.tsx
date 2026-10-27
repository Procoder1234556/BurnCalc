import Link from "next/link";
import { MarketingContainer } from "@/components/marketing/container";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ToolIcon } from "@/components/marketing/tool-icon";
import { TOOL_CATEGORIES, TOOLS, type ToolCategory } from "@/data/tools-catalog";

function ToolsByCategory({ category }: { category: ToolCategory }) {
  const items = TOOLS.filter((t) => t.category === category);
  if (items.length === 0) return null;

  const meta = TOOL_CATEGORIES[category];

  return (
    <div className="mt-12 first:mt-10">
      <h3 className="text-lg font-semibold text-text">{meta.label}</h3>
      <p className="mt-1 text-sm text-muted">{meta.description}</p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((tool) => (
          <li key={tool.slug}>
            <Link
              href={`/tools/${tool.slug}`}
              className="group flex h-full flex-col rounded-xl border border-border bg-white p-4 transition-shadow hover:shadow-[0_8px_24px_rgba(26,26,26,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span
                className="flex size-11 items-center justify-center rounded-lg text-white"
                style={{ backgroundColor: tool.accent }}
              >
                <ToolIcon name={tool.icon} className="size-5" />
              </span>
              <span className="mt-3 text-sm font-semibold text-text group-hover:text-primary">
                {tool.shortLabel}
              </span>
              <span className="mt-1 text-xs leading-relaxed text-muted line-clamp-2">
                {tool.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ToolsHubGrid() {
  return (
    <section id="tools" className="scroll-mt-24 bg-surface-elevated py-16 sm:py-20 lg:py-24">
      <MarketingContainer>
        <SectionHeading
          align="center"
          eyebrow="All tools"
          title="Every startup finance calculator in one place"
          description="Pick a tool — each page is focused, fast, and free. Like a PDF toolkit, but for burn, runway, unit economics, and round math."
        />
        {(Object.keys(TOOL_CATEGORIES) as ToolCategory[]).map((cat) => (
          <ToolsByCategory key={cat} category={cat} />
        ))}
        <p className="mt-12 text-center text-sm text-muted">
          Need every metric at once?{" "}
          <Link href="/dashboard/workspace" className="font-medium text-text underline-offset-2 hover:underline">
            Open the full workspace
          </Link>
        </p>
      </MarketingContainer>
    </section>
  );
}
