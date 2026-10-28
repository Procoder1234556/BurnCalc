import { GEO_MARKETS, GEO_REGIONS, toolGeoPath } from "@/lib/seo/geo-markets";
import { TOOLS } from "@/data/tools-catalog";

export type StaticPageSeo = {
  path: string;
  title: string;
  description: string;
  keywords: string[];
};

export const STATIC_PAGE_SEO: StaticPageSeo[] = [
  {
    path: "/",
    title: "BurnCalc — Startup burn, runway & finance calculators",
    description:
      "Quotes, thoughts, and free calculators for founders and investors worldwide. Burn rate, runway, CAC, LTV, dilution, and more — private, browser-based tools.",
    keywords: [
      "startup finance calculator",
      "burn rate calculator",
      "runway calculator",
      "founder metrics",
    ],
  },
  {
    path: "/tools",
    title: "Free startup finance calculators",
    description:
      "Browse dedicated pages for burn, runway, unit economics, and fundraising math. Built for Google, Bing, and Brave search — one focused tool per URL.",
    keywords: ["startup calculators", "saas metrics tools", "free financial calculators"],
  },
  {
    path: "/privacy",
    title: "Privacy policy",
    description:
      "BurnCalc runs in your browser. Learn what data stays on your device when you use our startup finance calculators.",
    keywords: ["burncalc privacy", "browser calculator privacy"],
  },
  {
    path: "/terms",
    title: "Terms of use",
    description:
      "Terms for using BurnCalc startup finance calculators. Illustrative outputs only — not financial advice.",
    keywords: ["burncalc terms"],
  },
  {
    path: "/cookies",
    title: "Cookie policy",
    description:
      "How BurnCalc uses cookies and similar technologies on burncalc.app, including optional analytics.",
    keywords: ["burncalc cookies", "cookie policy"],
  },
];

export function listAllPublicPaths(): string[] {
  const paths = STATIC_PAGE_SEO.map((p) => p.path);
  for (const tool of TOOLS) {
    paths.push(`/tools/${tool.slug}`);
    for (const region of GEO_REGIONS) {
      paths.push(toolGeoPath(tool.slug, region));
    }
  }
  return paths;
}

export function geoLandingBlurbs(): string[] {
  return GEO_REGIONS.map((region) => {
    const m = GEO_MARKETS[region];
    return `${m.countryName} (${m.hreflang}): ${m.audienceLabel} — hubs include ${m.hubCities}.`;
  });
}
