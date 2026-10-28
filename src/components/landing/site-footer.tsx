import { LegalFooterLinks } from "@/components/legal/legal-footer-links";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-[90%] max-w-[1200px] flex-col gap-6 px-0 py-8 sm:flex-row sm:items-start sm:justify-between">
        <p className="max-w-md text-pretty text-xs text-muted">
          For illustrative purposes only. Not investment, tax, or legal advice.
          Verify formulas against your model before sharing externally.
        </p>
        <div className="flex flex-col gap-3 sm:items-end">
          <LegalFooterLinks
            className="flex flex-wrap gap-x-6 gap-y-2 text-xs"
            separator="none"
            linkClassName="text-muted transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
          <span className="text-xs text-muted/80">© {new Date().getFullYear()} BurnCalc</span>
        </div>
      </div>
    </footer>
  );
}
