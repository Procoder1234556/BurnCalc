import Link from "next/link";
import { STATIC_PAGE_SEO } from "@/lib/seo/page-registry";
import { buildPageMetadata } from "@/lib/seo/site";

const seo = STATIC_PAGE_SEO.find((p) => p.path === "/terms")!;

export const metadata = buildPageMetadata({
  title: seo.title,
  description: seo.description,
  path: "/terms",
  keywords: seo.keywords,
});

export default function TermsPage() {
  return (
    <main className="mx-auto w-[90%] max-w-[680px] px-0 py-16">
      <Link
        href="/"
        className="text-sm text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        ← Back to BurnCalc
      </Link>
      <h1 className="mt-8 text-3xl font-bold text-text">Terms</h1>
      <p className="mt-6 text-pretty text-base text-muted">
        BurnCalc is provided for illustration only. It is not investment, tax,
        or legal advice. You are responsible for verifying formulas and outputs
        before sharing them externally. Use at your own discretion.
      </p>
    </main>
  );
}
