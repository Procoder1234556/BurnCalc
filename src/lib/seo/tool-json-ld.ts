import type { ToolDefinition } from "@/data/tools-catalog";
import { GEO_MARKETS, type GeoRegion } from "@/lib/seo/geo-markets";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildJsonLdGraph,
  buildToolApplicationJsonLd,
  buildToolWebPageJsonLd,
} from "@/lib/seo/json-ld";
import { buildToolGeoCopy } from "@/lib/seo/tool-seo";

export function buildToolPageJsonLd(
  tool: ToolDefinition,
  pagePath: string,
  description: string,
  region?: GeoRegion,
) {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools" },
    { name: tool.shortLabel, path: `/tools/${tool.slug}` },
  ];
  if (region) {
    breadcrumbs.push({
      name: GEO_MARKETS[region].countryName,
      path: pagePath,
    });
  }

  const areaServed = region
    ? [GEO_MARKETS[region].schemaCountry]
    : Object.values(GEO_MARKETS).map((m) => m.schemaCountry);

  return buildJsonLdGraph([
    buildBreadcrumbJsonLd(breadcrumbs),
    buildToolWebPageJsonLd(tool, pagePath, description),
    buildToolApplicationJsonLd(tool, pagePath, description, areaServed),
    buildFaqJsonLd(tool.faq),
  ]);
}

export function toolPageDescription(tool: ToolDefinition, region?: GeoRegion) {
  if (region) {
    return buildToolGeoCopy(tool, region).description;
  }
  return tool.seoDescription;
}
