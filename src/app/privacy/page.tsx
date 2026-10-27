import Link from "next/link";
import { STATIC_PAGE_SEO } from "@/lib/seo/page-registry";
import { buildPageMetadata } from "@/lib/seo/site";

const seo = STATIC_PAGE_SEO.find((p) => p.path === "/privacy")!;

export const metadata = buildPageMetadata({
  title: seo.title,
  description: seo.description,
  path: "/privacy",
  keywords: seo.keywords,
});

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-[90%] max-w-[680px] px-0 py-16">
      <Link
        href="/"
        className="text-sm text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        ← Back to BurnCalc
      </Link>
      <h1 className="mt-8 text-3xl font-bold text-text">Privacy</h1>
      <p className="mt-6 text-pretty text-base text-muted">
        BurnCalc runs calculations in your browser. We do not collect the
        numbers you enter unless you choose to copy or export them yourself. We
        may collect standard analytics if enabled on the host, but the MVP is
        designed to work without storing deal data on a server.
      </p>
    </main>
  );
}
