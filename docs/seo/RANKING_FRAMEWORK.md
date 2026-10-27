# BurnCalc search ranking framework

Technical checklist for **Google Search**, **Bing** (including Microsoft Edge default search), and **Brave Search**. This document describes what the codebase implements and what you must configure in each webmaster console. **No ranking outcome is guaranteed.**

## 1. URL inventory (one intent per URL)

| Surface | URL pattern | Index intent |
| --- | --- | --- |
| Home | `/` | Brand + hub |
| Tools index | `/tools` | Category landing |
| Global tool | `/tools/{slug}` | `x-default` hreflang |
| Geo tool | `/tools/{slug}/for/{us\|uk\|eu\|in}` | Regional title, description, copy |
| Legal | `/privacy`, `/terms` | Trust |
| LLM maps | `/llms.txt`, `/llms-full.txt` | Answer-engine discovery |
| Private app | `/dashboard/*` | `noindex` via `robots.txt` disallow |

## 2. Per-page metadata (implemented in `src/lib/seo/`)

- Unique **title** and **meta description** per static page and per tool/geo URL.
- **Canonical** URL on every public page.
- **hreflang** cluster on tool pages: `x-default`, `en-US`, `en-GB`, `en`, `en-IN`.
- **Open Graph** + **Twitter** cards per page.
- Optional verification tags via environment variables:
  - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
  - `NEXT_PUBLIC_BING_SITE_VERIFICATION`
- Production canonical host: `NEXT_PUBLIC_SITE_URL`

## 3. Structured data (JSON-LD `@graph`)

Served in HTML (not client-only):

- **Home:** `Organization`, `WebSite` (+ `SearchAction`), `FAQPage`
- **Tools:** `BreadcrumbList`, `WebPage`, `WebApplication`, `FAQPage`
- **Geo tools:** `areaServed` narrowed to the target region

Validate after deploy: [Google Rich Results Test](https://search.google.com/test/rich-results), [Schema Markup Validator](https://validator.schema.org/).

## 4. Crawl files

- `robots.txt` — allows public paths; blocks `/dashboard/`; lists sitemap; explicit rules for Googlebot, Bingbot, Brave, DuckDuckBot.
- `sitemap.xml` — home, tools index, legal, every tool, every geo variant.

Submit sitemap in:

- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters) (also used for much of Edge web search)
- [Brave Search Goggles / site submission](https://search.brave.com/) where available

## 5. Google

1. Verify domain in Search Console (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`).
2. Submit `https://<domain>/sitemap.xml`.
3. Inspect a sample tool URL and geo URL; request indexing after major launches.
4. Monitor **Core Web Vitals** and **HTTPS** — static SSG pages are preferred.
5. Avoid duplicate thin content: geo pages include unique regional paragraphs.

## 6. Microsoft Bing & Edge

1. Verify in Bing Webmaster Tools (`NEXT_PUBLIC_BING_SITE_VERIFICATION`).
2. Submit the same sitemap.
3. Use **URL Inspection** for `/tools/*` and geo URLs.
4. Optional: enable [IndexNow](https://www.indexnow.org/) on deploy (not wired by default; add key + ping when you have a stable production URL).

## 7. Brave Search

Brave runs its own crawler and also ingests signals from broader search ecosystems.

1. Ensure `robots.txt` allows `User-agent: Brave`.
2. Keep canonicals strict; avoid redirect chains.
3. Submit or claim the site in Brave’s webmaster tools when offered for your property.

## 8. LLM / answer-engine discoverability (`llms.txt`)

- `/llms.txt` — concise site map for models (tools + geo URLs + citation rules).
- `/llms-full.txt` — expanded tool copy, FAQs, and search notes.

This does **not** replace SEO. It helps compliant crawlers and assistants find authoritative URLs.

## 9. What actually moves rankings (product work)

- **Backlinks** from finance, startup, and VC content sites.
- **Search Console** queries → improve titles for pages with impressions but low CTR.
- **New guides** linking to each tool (one article per metric).
- **Performance** — keep LCP low on tool pages.
- **Trust** — accurate formulas, disclaimers, no fabricated reviews in schema.

## 10. Release verification script (manual)

After each production deploy:

```bash
curl -sI https://<domain>/robots.txt
curl -sI https://<domain>/sitemap.xml
curl -sI https://<domain>/llms.txt
curl -s https://<domain>/tools/burn-rate-calculator | findstr /i "application/ld+json"
curl -s https://<domain>/tools/burn-rate-calculator/for/us | findstr /i "en-US"
```

Replace `<domain>` with your live host.
