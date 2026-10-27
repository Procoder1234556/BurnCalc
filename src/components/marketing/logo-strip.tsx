import { MarketingContainer } from "@/components/marketing/container";
import { LOGO_STRIP } from "@/data/marketing";

export function LogoStrip() {
  return (
    <section aria-label="Trusted by founders and investors" className="bg-background py-12 sm:py-14">
      <MarketingContainer>
        <p className="text-center text-xs font-medium text-muted">
          Trusted by founders and investors
        </p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {LOGO_STRIP.map((name) => (
            <li
              key={name}
              className="text-[13px] font-medium tracking-tight text-muted/80"
            >
              {name}
            </li>
          ))}
        </ul>
      </MarketingContainer>
    </section>
  );
}
