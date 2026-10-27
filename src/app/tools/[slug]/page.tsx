import { notFound } from "next/navigation";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { ToolPageContent } from "@/components/tools/tool-page-content";
import { getToolBySlug, TOOL_SLUGS } from "@/data/tools-catalog";
import { buildPageMetadata } from "@/lib/seo/site";
import { buildDefaultToolMetadataInput } from "@/lib/seo/tool-seo";
import { buildToolPageJsonLd, toolPageDescription } from "@/lib/seo/tool-json-ld";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return TOOL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  const input = buildDefaultToolMetadataInput(tool);
  return buildPageMetadata(input);
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const pagePath = `/tools/${tool.slug}`;
  const description = toolPageDescription(tool);
  const jsonLd = buildToolPageJsonLd(tool, pagePath, description);

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar />
      <ToolPageContent tool={tool} />
      <Footer />
    </>
  );
}
