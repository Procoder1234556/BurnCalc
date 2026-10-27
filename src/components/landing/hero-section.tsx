import { RevealOnView } from "@/components/landing/reveal-on-view";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto w-[90%] max-w-[1200px] px-0 pb-12 pt-12 sm:pb-16 sm:pt-16 lg:pt-20"
    >
      <RevealOnView>
        <div className="max-w-[680px]">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Browser only · No signup
          </p>
          <h1
            id="hero-heading"
            className="hero-heading mt-4 text-balance text-3xl font-bold sm:text-4xl lg:text-5xl"
          >
            Deal metrics without
            <br />
            rebuilding the spreadsheet
          </h1>
          <p className="mt-6 text-pretty text-base text-muted">
            Enter cash, burn, growth, and round size once. BurnCalc returns runway,
            LTV:CAC, Rule of 40, and dilution with the formulas visible in under
            two minutes.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#calculator"
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-3 py-2 text-base font-semibold text-primary-foreground shadow-[0_0_24px_rgba(79,70,229,0.12)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
            >
              Run the numbers
            </a>
            <p className="text-sm text-muted">
              Free · Runs locally · 17 live outputs
            </p>
          </div>
        </div>
      </RevealOnView>
    </section>
  );
}
