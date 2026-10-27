import Link from "next/link";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { MarketingContainer } from "@/components/marketing/container";
import { ToolsHubGrid } from "@/components/marketing/tools-hub-grid";
import { ToolIcon } from "@/components/marketing/tool-icon";
import { JsonLd } from "@/components/seo/json-ld";
import { TOOLS } from "@/data/tools-catalog";
import { STATIC_PAGE_SEO } from "@/lib/seo/page-registry";
import { buildJsonLdGraph, buildWebsiteJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/site";

const toolsSeo = STATIC_PAGE_SEO.find((p) => p.path === "/tools")!;

export const metadata = buildPageMetadata({
  title: toolsSeo.title,
  description: toolsSeo.description,
  path: "/tools",
  keywords: toolsSeo.keywords,
});

export default function ToolsIndexPage() {
  const jsonLd = buildJsonLdGraph([buildWebsiteJsonLd()]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar />
      <main id="main">
        <div className="border-b border-border bg-background py-10 sm:py-12">
          <MarketingContainer>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
              Startup finance calculators
            </h1>
            <p className="mt-3 max-w-2xl text-pretty text-muted">
              One dedicated page per metric — fast, focused, and free. Each tool has global and
              regional URLs for search (US, UK, EU, India). Jump to the{" "}
              <Link href="/dashboard/workspace" className="text-text underline-offset-2 hover:underline">
                full workspace
              </Link>
              .
            </p>
            <p className="mt-2 text-sm text-muted">
              Answer engines: see{" "}
              <Link href="/llms.txt" className="text-text underline-offset-2 hover:underline">
                llms.txt
              </Link>{" "}
              and{" "}
              <Link href="/llms-full.txt" className="text-text underline-offset-2 hover:underline">
                llms-full.txt
              </Link>
              .
            </p>
            <ul className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {TOOLS.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="flex items-center gap-2 text-sm text-muted hover:text-text"
                  >
                    <ToolIcon name={tool.icon} className="size-4 shrink-0 opacity-70" />
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </MarketingContainer>
        </div>
        <ToolsHubGrid />
      </main>
      <Footer />
    </>
  );
}
