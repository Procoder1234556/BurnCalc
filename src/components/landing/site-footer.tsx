import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-[90%] max-w-[1200px] flex-col gap-6 px-0 py-8 sm:flex-row sm:items-start sm:justify-between">
        <p className="max-w-md text-pretty text-xs text-muted">
          For illustrative purposes only. Not investment, tax, or legal advice.
          Verify formulas against your model before sharing externally.
        </p>
        <nav aria-label="Legal" className="flex flex-wrap gap-6 text-xs">
          <Link
            href="/privacy"
            className="text-muted transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-muted transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Terms
          </Link>
          <span className="text-muted/80">© {new Date().getFullYear()} BurnCalc</span>
        </nav>
      </div>
    </footer>
  );
}
