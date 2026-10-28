import { Footer } from "@/components/marketing/footer";
import { LegalDocument } from "@/components/legal/legal-document";
import { LegalPageShell } from "@/components/legal/legal-page-shell";
import { loadLegalDocument } from "@/lib/legal/load-document";
import { STATIC_PAGE_SEO } from "@/lib/seo/page-registry";
import { buildPageMetadata } from "@/lib/seo/site";

const seo = STATIC_PAGE_SEO.find((p) => p.path === "/terms")!;

export const metadata = buildPageMetadata({
  title: seo.title,
  description: seo.description,
  path: "/terms",
  keywords: seo.keywords,
});

export default async function TermsPage() {
  const markdown = await loadLegalDocument("terms");

  return (
    <>
      <LegalPageShell>
        <LegalDocument markdown={markdown} />
      </LegalPageShell>
      <Footer />
    </>
  );
}
