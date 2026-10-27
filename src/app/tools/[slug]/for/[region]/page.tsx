import { notFound } from "next/navigation";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { ToolPageContent } from "@/components/tools/tool-page-content";
import { getToolBySlug, TOOL_SLUGS } from "@/data/tools-catalog";
import { GEO_REGIONS, isGeoRegion } from "@/lib/seo/geo-markets";
import { buildPageMetadata } from "@/lib/seo/site";
import { buildToolGeoMetadataInput } from "@/lib/seo/tool-seo";
import { buildToolPageJsonLd, toolPageDescription } from "@/lib/seo/tool-json-ld";

type PageProps = { params: Promise<{ slug: string; region: string }> };

export function generateStaticParams() {
  return TOOL_SLUGS.flatMap((slug) =>
    GEO_REGIONS.map((region) => ({ slug, region })),
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, region } = await params;
  if (!isGeoRegion(region)) return {};
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  const input = buildToolGeoMetadataInput(tool, region);
  return buildPageMetadata(input);
}

export default async function ToolGeoPage({ params }: PageProps) {
  const { slug, region } = await params;
  if (!isGeoRegion(region)) notFound();
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const pagePath = `/tools/${tool.slug}/for/${region}`;
  const description = toolPageDescription(tool, region);
  const jsonLd = buildToolPageJsonLd(tool, pagePath, description, region);

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar />
      <ToolPageContent tool={tool} region={region} />
      <Footer />
    </>
  );
}
