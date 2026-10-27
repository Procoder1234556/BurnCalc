import { MarketingContainer } from "@/components/marketing/container";
import { PrimaryButton } from "@/components/marketing/primary-button";
import { CTA_BANNER_BULLETS } from "@/data/marketing";
import { SIGNUP_URL } from "@/lib/marketing/links";

export function CtaBanner() {
  return (
    <section className="bg-background py-12 sm:py-16">
      <MarketingContainer>
        <div className="rounded-2xl bg-primary px-6 py-10 text-primary-foreground sm:px-10 sm:py-12 lg:px-14">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
              Try the calculator now
            </h2>
            <p className="mt-3 text-sm text-primary-foreground/80 sm:text-[15px]">
              Open BurnCalc in your browser and see live metrics in under two
              minutes.
            </p>
            <ul className="mt-6 space-y-2 text-left text-sm text-primary-foreground/90 sm:mx-auto sm:max-w-sm">
              {CTA_BANNER_BULLETS.map((bullet) => (
                <li key={bullet} className="flex gap-2">
                  <span className="text-primary-foreground/60" aria-hidden>—</span>
                  {bullet}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <PrimaryButton
                href={SIGNUP_URL}
                className="bg-white text-primary hover:bg-white/90"
              >
                Try BurnCalc free
              </PrimaryButton>
            </div>
          </div>
        </div>
      </MarketingContainer>
    </section>
  );
}
