import type { ToolDefinition } from "@/data/tools-catalog";
import type { GeoMarket } from "@/lib/seo/geo-markets";
import { SITE_NAME, getSiteUrl } from "@/lib/seo/site";

export function buildBreadcrumbJsonLd(
  items: { name: string; path: string }[],
): Record<string, unknown> {
  const base = getSiteUrl();
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${base}${item.path}`,
    })),
  };
}

export function buildToolWebPageJsonLd(
  tool: ToolDefinition,
  pagePath: string,
  description: string,
): Record<string, unknown> {
  const base = getSiteUrl();
  return {
    "@type": "WebPage",
    "@id": `${base}${pagePath}#webpage`,
    url: `${base}${pagePath}`,
    name: tool.name,
    description,
    isPartOf: { "@id": `${base}/#website` },
    about: {
      "@type": "Thing",
      name: tool.shortLabel,
      description: tool.intro,
    },
    inLanguage: "en",
  };
}

export function buildToolApplicationJsonLd(
  tool: ToolDefinition,
  pagePath: string,
  description: string,
  areaServed: GeoMarket["schemaCountry"][],
): Record<string, unknown> {
  const base = getSiteUrl();
  return {
    "@type": "WebApplication",
    "@id": `${base}${pagePath}#app`,
    name: tool.name,
    url: `${base}${pagePath}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    description,
    areaServed,
    provider: { "@id": `${base}/#organization` },
  };
}

export function buildFaqJsonLd(faq: { q: string; a: string }[]): Record<string, unknown> {
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function buildWebsiteJsonLd(): Record<string, unknown> {
  const base = getSiteUrl();
  return {
    "@type": "WebSite",
    "@id": `${base}/#website`,
    url: base,
    name: SITE_NAME,
    description:
      "Free startup finance calculators: burn, runway, CAC, LTV, dilution, and more.",
    publisher: { "@id": `${base}/#organization` },
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${base}/tools?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildOrganizationJsonLd(): Record<string, unknown> {
  const base = getSiteUrl();
  return {
    "@type": "Organization",
    "@id": `${base}/#organization`,
    name: SITE_NAME,
    url: base,
    logo: `${base}/icon`,
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Place", name: "European Union" },
      { "@type": "Country", name: "India" },
    ],
  };
}

export function buildJsonLdGraph(nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
