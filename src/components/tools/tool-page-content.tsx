import Link from "next/link";
import { MarketingContainer } from "@/components/marketing/container";
import { FocusedToolCalculator } from "@/components/tools/focused-tool-calculator";
import { RelatedTools } from "@/components/tools/related-tools";
import { GeoRegionLinks } from "@/components/tools/geo-region-links";
import { PrimaryButton } from "@/components/marketing/primary-button";
import { TOOL_CATEGORIES, type ToolDefinition } from "@/data/tools-catalog";
import type { GeoRegion } from "@/lib/seo/geo-markets";
import { buildToolGeoCopy } from "@/lib/seo/tool-seo";

type ToolPageContentProps = {
  tool: ToolDefinition;
  region?: GeoRegion;
};

export function ToolPageContent({ tool, region }: ToolPageContentProps) {
  const categoryLabel = TOOL_CATEGORIES[tool.category].label;
  const geo = region ? buildToolGeoCopy(tool, region) : null;

  return (
    <main id="main">
      <div className="border-b border-border bg-background py-8 sm:py-10">
        <MarketingContainer>
          <nav className="text-xs text-muted" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1">
              <li>
                <Link href="/" className="hover:text-text">Home</Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/tools" className="hover:text-text">Tools</Link>
              </li>
              {region ? (
                <>
                  <li aria-hidden>/</li>
                  <li>
                    <Link href={`/tools/${tool.slug}`} className="hover:text-text">
                      {tool.shortLabel}
                    </Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li className="text-text uppercase">{region}</li>
                </>
              ) : (
                <>
                  <li aria-hidden>/</li>
                  <li className="text-text">{tool.shortLabel}</li>
                </>
              )}
            </ol>
          </nav>
          <p className="mt-4 text-xs font-medium uppercase tracking-wide text-primary">
            {categoryLabel}
            {region ? ` · ${geo?.title.split(" for ").pop()}` : null}
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            {geo?.h1 ?? tool.name}
          </h1>
          <p className="mt-3 max-w-2xl text-pretty text-muted">
            {geo?.description ?? tool.intro}
          </p>
          {geo?.regionalParagraph ? (
            <p className="mt-3 max-w-2xl text-pretty text-sm text-muted">
              {geo.regionalParagraph}
            </p>
          ) : null}
          <GeoRegionLinks slug={tool.slug} currentRegion={region} className="mt-5" />
        </MarketingContainer>
      </div>

      <section className="bg-surface-elevated py-10 sm:py-12" aria-label="Calculator">
        <MarketingContainer>
          <FocusedToolCalculator tool={tool} />
          <p className="mt-6 text-center text-xs text-muted">
            For illustration only. Not financial advice. Calculations run locally in your browser.
          </p>
        </MarketingContainer>
      </section>

      <section className="border-t border-border bg-background py-12 sm:py-14">
        <MarketingContainer className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)]">
          <div>
            <h2 className="text-lg font-semibold text-text">How it works</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted">
              {tool.howItWorks.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>

            <h2 className="mt-10 text-lg font-semibold text-text">FAQ</h2>
            <dl className="mt-4 space-y-6">
              {tool.faq.map((item) => (
                <div key={item.q}>
                  <dt className="text-sm font-semibold text-text">{item.q}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">{item.a}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 rounded-xl border border-border bg-surface-muted/40 p-5">
              <p className="text-sm font-semibold text-text">Full workspace</p>
              <p className="mt-1 text-sm text-muted">
                Model every metric together — burn, growth, unit economics, and round math in one view.
              </p>
              <div className="mt-4">
                <PrimaryButton href="/dashboard/workspace">Open workspace</PrimaryButton>
              </div>
            </div>
          </div>
          <RelatedTools current={tool} />
        </MarketingContainer>
      </section>
    </main>
  );
}
