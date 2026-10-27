import { MarketingPage } from "@/components/marketing/marketing-page";
import { JsonLd } from "@/components/seo/json-ld";
import { FAQ_ITEMS } from "@/data/marketing";
import { STATIC_PAGE_SEO } from "@/lib/seo/page-registry";
import {
  buildFaqJsonLd,
  buildJsonLdGraph,
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
} from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/site";

const homeSeo = STATIC_PAGE_SEO.find((p) => p.path === "/")!;

export const metadata = buildPageMetadata({
  title: homeSeo.title,
  description: homeSeo.description,
  path: "/",
  keywords: homeSeo.keywords,
});

export default function HomePage() {
  const jsonLd = buildJsonLdGraph([
    buildOrganizationJsonLd(),
    buildWebsiteJsonLd(),
    buildFaqJsonLd(FAQ_ITEMS.slice(0, 6).map((i) => ({ q: i.q, a: i.a }))),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <MarketingPage />
    </>
  );
}
