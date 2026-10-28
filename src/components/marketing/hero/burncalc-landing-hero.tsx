import Link from "next/link";
import { MarketingContainer } from "@/components/marketing/container";
import { CalculatorMockup } from "@/components/marketing/calculator-mockup";
import { DeviceBrowserFrame } from "@/components/marketing/device-browser-frame";
import { PrimaryButton } from "@/components/marketing/primary-button";
import { DvklabHalftoneCanvas } from "@/components/marketing/hero/dvklab-halftone-canvas";
import { ThreeUiHalftoneAccent } from "@/components/marketing/hero/threeui-halftone-accent";
import { Button } from "@/components/ui/button";
import { HERO_BENEFITS } from "@/data/marketing";

function HeroReveal({
  children,
  delayMs = 0,
  className = "",
}: {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
}) {
  return (
    <div
      className={`hero-dvklab-rise ${className}`}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}

/**
 * Landing hero: dvklab Halftone layout + motion, threeui halftone accent,
 * GSPA-inspired calm typography (design-taste / gradient-trust on light paper).
 */
export function BurncalcLandingHero() {
  return (
    <section
      aria-labelledby="burncalc-hero-heading"
      className="relative isolate flex min-h-[min(92vh,920px)] flex-col overflow-hidden border-b border-border"
    >
      <DvklabHalftoneCanvas />

      <div className="relative z-10 flex flex-1 flex-col">
        <MarketingContainer className="border-b border-border/70 bg-background/75 py-5 backdrop-blur-md">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            Financial metrics · Browser-only
          </p>
        </MarketingContainer>

        <MarketingContainer className="grid flex-1 items-start gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12 lg:py-16">
          <div className="min-w-0">
            <HeroReveal delayMs={120}>
              <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                <span className="h-px w-7 bg-current" aria-hidden />
                For founders &amp; investors
              </p>
            </HeroReveal>

            <HeroReveal delayMs={280}>
              <h1
                id="burncalc-hero-heading"
                className="relative mt-5 font-display text-[clamp(2.75rem,11vw,7.5rem)] font-semibold uppercase leading-[0.82] tracking-tight text-text mix-blend-multiply"
              >
                Run
                <br />
                the
                <br />
                numbers.
                <piix-pal pal="bitbug" aria-hidden />
              </h1>
            </HeroReveal>

            <HeroReveal delayMs={420} className="mt-8 max-w-md">
              <p className="text-pretty text-[15px] leading-relaxed text-muted sm:text-base">
                Enter cash, burn, growth, and round size once. BurnCalc returns runway,
                LTV:CAC, Rule of 40, and dilution — with formulas you can trust, in under
                two minutes.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <div className="hero-cta-calculator relative">
                  <PrimaryButton href="/calculator" className="rounded-md px-6">
                    Open calculator
                  </PrimaryButton>
                  <piix-pal pal="pip" on=".hero-cta-calculator" aria-hidden />
                </div>
                <Button asChild variant="outline" className="h-10 rounded-md px-5 text-sm">
                  <Link href="/tools">Browse tools</Link>
                </Button>
              </div>
            </HeroReveal>
          </div>

          <HeroReveal delayMs={360} className="space-y-5">
            <div className="hero-metric-panel relative">
              <ThreeUiHalftoneAccent />
              <piix-pal pal="lurk" on=".hero-metric-panel" aria-hidden />
            </div>
            <DeviceBrowserFrame>
              <CalculatorMockup variant="hero" />
            </DeviceBrowserFrame>
            <p className="text-center text-xs text-muted lg:text-left">
              Every output shows the formula behind the number.
            </p>
          </HeroReveal>
        </MarketingContainer>

        <MarketingContainer className="mt-auto border-t border-border/70 bg-background/80 py-4 backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
            <span>17 live outputs · No signup</span>
            <span className="hidden sm:inline">Runs locally in your browser</span>
            <span>Free forever</span>
          </div>
        </MarketingContainer>

        <div className="border-t border-border bg-surface-muted/70">
          <MarketingContainer className="py-10 sm:py-12">
            <ul className="grid gap-8 sm:grid-cols-3 sm:gap-6">
              {HERO_BENEFITS.map((item, i) => (
                <li
                  key={item.title}
                  className="hero-dvklab-rise text-center sm:text-left"
                  style={{ animationDelay: `${500 + i * 90}ms` }}
                >
                  <p className="text-sm font-semibold text-text">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </MarketingContainer>
        </div>
      </div>
    </section>
  );
}
