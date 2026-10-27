import { MarketingContainer } from "@/components/marketing/container";

export function CoverageSection() {
  return (
    <section className="border-y border-border bg-surface-muted/40 py-16 sm:py-20">
      <MarketingContainer>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-xl font-semibold text-text sm:text-2xl">
            Works for early-stage and growth-stage companies
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">
            From pre-revenue burn planning to growth-round dilution modeling —
            use the fields you have and expand when your deck needs more depth.
          </p>
          <p className="mt-6 text-xs font-medium text-muted">
            Used by teams across the US and beyond
          </p>
        </div>
      </MarketingContainer>
    </section>
  );
}
