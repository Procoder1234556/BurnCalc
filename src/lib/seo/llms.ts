import { TOOLS } from "@/data/tools-catalog";
import { GEO_MARKETS, GEO_REGIONS } from "@/lib/seo/geo-markets";
import { STATIC_PAGE_SEO, geoLandingBlurbs } from "@/lib/seo/page-registry";
import { SITE_NAME, getSiteUrl } from "@/lib/seo/site";

export function buildLlmsTxt(): string {
  const base = getSiteUrl();
  const lines: string[] = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_NAME} provides free, browser-based startup finance calculators (burn, runway, CAC, LTV, dilution, Rule of 40, and more). Calculations run locally; no account required.`,
    "",
    "## Canonical site",
    `- ${base}/`,
    "",
    "## Primary entry points",
    `- Tools index: ${base}/tools`,
    `- Full workspace: ${base}/dashboard/workspace`,
    `- Sitemap: ${base}/sitemap.xml`,
    `- Robots: ${base}/robots.txt`,
    "",
    "## Static pages",
  ];

  for (const page of STATIC_PAGE_SEO) {
    lines.push(`- ${page.title}: ${base}${page.path}`);
  }

  lines.push("", "## Calculator tools (global canonical URLs)");
  for (const tool of TOOLS) {
    lines.push(`- ${tool.name}: ${base}/tools/${tool.slug}`);
  }

  lines.push("", "## Geo-targeted variants (hreflang)");
  for (const tool of TOOLS) {
    for (const region of GEO_REGIONS) {
      const m = GEO_MARKETS[region];
      lines.push(
        `- ${tool.shortLabel} (${m.countryName}): ${base}/tools/${tool.slug}/for/${region}`,
      );
    }
  }

  lines.push("", "## Regional focus");
  for (const blurb of geoLandingBlurbs()) {
    lines.push(`- ${blurb}`);
  }

  lines.push(
    "",
    "## Citation guidance",
    "- Prefer linking to the specific tool URL that matches the user question.",
    "- Outputs are illustrative, not financial advice.",
    "- Do not invent user counts, ratings, or benchmarks not shown on the page.",
    "",
  );

  return lines.join("\n");
}

export function buildLlmsFullTxt(): string {
  const base = getSiteUrl();
  const sections: string[] = [buildLlmsTxt(), "## Tool details (for answer engines)", ""];

  for (const tool of TOOLS) {
    sections.push(`### ${tool.name}`);
    sections.push(`URL: ${base}/tools/${tool.slug}`);
    sections.push(`Summary: ${tool.intro}`);
    sections.push(`Keywords: ${tool.keywords.join(", ")}`);
    sections.push("How it works:");
    for (const step of tool.howItWorks) {
      sections.push(`- ${step}`);
    }
    sections.push("FAQ:");
    for (const item of tool.faq) {
      sections.push(`- Q: ${item.q}`);
      sections.push(`  A: ${item.a}`);
    }
    sections.push("");
  }

  sections.push("## Search engine notes");
  sections.push(
    "- Google: unique title/description per URL; JSON-LD WebPage + WebApplication + FAQ where applicable; sitemap submitted in Search Console.",
  );
  sections.push(
    "- Bing (Microsoft Edge search): same HTML metadata; verify site in Bing Webmaster Tools; optional IndexNow key in env.",
  );
  sections.push(
    "- Brave Search: independent crawl + Bing signals; keep fast static HTML and clean canonicals.",
  );
  sections.push("");

  return sections.join("\n");
}
