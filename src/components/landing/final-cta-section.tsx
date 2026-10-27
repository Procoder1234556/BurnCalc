import { RevealOnView } from "@/components/landing/reveal-on-view";

export function FinalCtaSection() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="mx-auto w-[90%] max-w-[1200px] px-0 py-12 sm:py-16"
    >
      <RevealOnView>
        <div className="max-w-[680px]">
          <h2
            id="final-cta-heading"
            className="text-balance text-2xl font-bold text-text sm:text-3xl"
          >
            Ready to sanity check the round?
          </h2>
          <p className="mt-4 text-pretty text-base text-muted">
            No credit card, no trial timer, no export paywall. Open the workspace
            and work through the numbers at your own pace.
          </p>
          <a
            href="#calculator"
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-3 py-2 text-base font-semibold text-primary-foreground shadow-[0_0_24px_rgba(79,70,229,0.12)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
          >
            Run the numbers
          </a>
        </div>
      </RevealOnView>
    </section>
  );
}
