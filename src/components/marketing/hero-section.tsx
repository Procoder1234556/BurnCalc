import Link from "next/link";
import { MarketingContainer } from "@/components/marketing/container";
import { CalculatorMockup } from "@/components/marketing/calculator-mockup";
import { DeviceBrowserFrame } from "@/components/marketing/device-browser-frame";
import { PrimaryButton } from "@/components/marketing/primary-button";
import { RiveAccent } from "@/components/marketing/rive-accent";
import { Button } from "@/components/ui/button";
import { HERO_BENEFITS } from "@/data/marketing";
import { JitterReveal } from "@/components/motion/jitter-reveal";
import { SIGNUP_URL } from "@/lib/marketing/links";

export function HeroSection() {
  return (
    <section id="product" className="bg-background pb-0 pt-10 sm:pt-14 lg:pt-16">
      <MarketingContainer>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <JitterReveal className="text-center lg:text-left">
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <RiveAccent className="hidden size-10 sm:block" />
              <p className="text-xs font-medium text-muted">
                Built for founders and investors · No signup required
              </p>
            </div>
            <h1
              className="mt-4 font-display text-balance text-[2.25rem] font-semibold leading-[1.12] tracking-tight text-text sm:text-[2.75rem] lg:text-[3rem]"
            >
              Know your burn.
              <br />
              Know your runway.
              <br />
              In minutes.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-muted sm:text-base lg:mx-0">
              Enter a few numbers and instantly see burn rate, runway, LTV:CAC,
              valuation, ownership, and key ratios — built for founders preparing
              pitches and VCs screening deals.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <PrimaryButton href={SIGNUP_URL}>Try BurnCalc free</PrimaryButton>
              <Button asChild variant="outline" className="h-10 px-5 text-sm">
                <Link href="#demo">See how it works</Link>
              </Button>
            </div>
          </JitterReveal>

          <JitterReveal delayMs={100} className="relative">
            <DeviceBrowserFrame>
              <CalculatorMockup variant="hero" />
            </DeviceBrowserFrame>
            <div
              className="absolute -bottom-3 left-4 hidden rounded-lg border border-border bg-white px-3 py-2 shadow-sm motion-safe:animate-[jitter-in_0.65s_ease-out] sm:block"
              aria-hidden
            >
              <p className="text-[10px] text-muted">Monthly burn</p>
              <p className="font-mono text-sm font-semibold text-text">$125,000</p>
            </div>
            <div
              className="absolute -right-2 top-8 hidden rounded-lg border border-border bg-white px-3 py-2 shadow-sm sm:block"
              aria-hidden
            >
              <p className="text-[10px] text-muted">Runway</p>
              <p className="font-mono text-sm font-semibold text-positive">19.2 mo</p>
            </div>
            <div
              className="absolute right-6 bottom-16 hidden rounded-lg border border-border bg-white px-3 py-2 shadow-sm lg:block"
              aria-hidden
            >
              <p className="text-[10px] text-muted">LTV : CAC</p>
              <p className="font-mono text-sm font-semibold text-positive">52.6×</p>
            </div>
          </JitterReveal>
        </div>
      </MarketingContainer>

      <div className="mt-14 border-y border-border bg-surface-muted/60 sm:mt-20">
        <MarketingContainer className="py-10 sm:py-12">
          <ul className="grid gap-8 sm:grid-cols-3 sm:gap-6">
            {HERO_BENEFITS.map((item, i) => (
              <JitterReveal key={item.title} as="li" delayMs={i * 90} className="text-center sm:text-left">
                <p className="text-sm font-semibold text-text">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </JitterReveal>
            ))}
          </ul>
        </MarketingContainer>
      </div>
    </section>
  );
}
