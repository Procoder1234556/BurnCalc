import type { ToolDefinition } from "@/data/tools-catalog";
import {
  GEO_MARKETS,
  type GeoRegion,
  toolGeoPath,
} from "@/lib/seo/geo-markets";
import { getSiteUrl } from "@/lib/seo/site";

export function buildToolHreflangMap(slug: string): Record<string, string> {
  const base = getSiteUrl();
  const map: Record<string, string> = {
    "x-default": `${base}/tools/${slug}`,
  };
  for (const region of Object.values(GEO_MARKETS)) {
    map[region.hreflang] = `${base}${toolGeoPath(slug, region.id)}`;
  }
  return map;
}

export function buildToolGeoCopy(tool: ToolDefinition, region: GeoRegion) {
  const market = GEO_MARKETS[region];
  return {
    title: `${tool.name} for ${market.countryName}`,
    h1: `${tool.name} — ${market.audienceLabel}`,
    description: `Free ${tool.name.toLowerCase()} for ${market.audienceLabel}. ${tool.intro} ${market.currencyNote}`,
    regionalParagraph: `${tool.shortLabel} is one of the first checks in decks from ${market.hubCities}. This page targets ${market.countryName} teams who need fast, defensible numbers before investor calls.`,
  };
}

export function buildToolGeoMetadataInput(tool: ToolDefinition, region: GeoRegion) {
  const market = GEO_MARKETS[region];
  const copy = buildToolGeoCopy(tool, region);
  return {
    title: copy.title,
    description: copy.description,
    path: toolGeoPath(tool.slug, region),
    keywords: [...tool.keywords, ...market.extraKeywords],
    openGraphLocale: market.openGraphLocale,
    hreflang: market.hreflang,
    alternatesLanguages: buildToolHreflangMap(tool.slug),
  };
}

export function buildDefaultToolMetadataInput(tool: ToolDefinition) {
  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    path: `/tools/${tool.slug}`,
    keywords: tool.keywords,
    alternatesLanguages: buildToolHreflangMap(tool.slug),
  };
}
