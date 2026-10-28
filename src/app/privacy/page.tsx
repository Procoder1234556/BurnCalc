import { Footer } from "@/components/marketing/footer";
import { LegalDocument } from "@/components/legal/legal-document";
import { LegalPageShell } from "@/components/legal/legal-page-shell";
import { loadLegalDocument } from "@/lib/legal/load-document";
import { STATIC_PAGE_SEO } from "@/lib/seo/page-registry";
import { buildPageMetadata } from "@/lib/seo/site";

const seo = STATIC_PAGE_SEO.find((p) => p.path === "/privacy")!;

export const metadata = buildPageMetadata({
  title: seo.title,
  description: seo.description,
  path: "/privacy",
  keywords: seo.keywords,
});

export default async function PrivacyPage() {
  const markdown = await loadLegalDocument("privacy");

  return (
    <>
      <LegalPageShell>
        <LegalDocument markdown={markdown} />
      </LegalPageShell>
      <Footer />
    </>
  );
}
