import { MarketingContainer } from "@/components/marketing/container";
import { CalculatorMockup } from "@/components/marketing/calculator-mockup";
import { DeviceBrowserFrame } from "@/components/marketing/device-browser-frame";
import { SectionHeading } from "@/components/marketing/section-heading";
import { PROCESS_STEPS } from "@/data/marketing";

export function ProcessSection() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-background py-20 sm:py-24 lg:py-28">
      <MarketingContainer>
        <SectionHeading align="center" title="A clear four-step path" />
        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <DeviceBrowserFrame className="order-2 lg:order-1">
            <CalculatorMockup variant="burn" />
          </DeviceBrowserFrame>
          <ol className="order-1 space-y-8 lg:order-2">
            {PROCESS_STEPS.map((item) => (
              <li key={item.step} className="flex gap-4">
                <span
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface-elevated text-sm font-semibold text-text"
                  aria-hidden
                >
                  {item.step}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-text">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </MarketingContainer>
    </section>
  );
}
