import Link from "next/link";
import { MarketingContainer } from "@/components/marketing/container";
import { PrimaryButton } from "@/components/marketing/primary-button";
import { Button } from "@/components/ui/button";
import { SIGNUP_URL } from "@/lib/marketing/links";

export function FinalCTA() {
  return (
    <section className="bg-surface-muted/50 py-20 sm:py-24">
      <MarketingContainer>
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-white px-6 py-12 text-center sm:px-10 sm:py-14">
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-text sm:text-[1.75rem]">
            Let&apos;s calculate the numbers your business needs.
          </h2>
          <p className="mt-3 text-sm text-muted sm:text-[15px]">
            Free to start. Runs in your browser. Export when you&apos;re ready.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <PrimaryButton href={SIGNUP_URL}>Try BurnCalc free</PrimaryButton>
            <Button asChild variant="outline" className="h-10 px-5 text-sm">
              <Link href="#metrics">Explore metrics</Link>
            </Button>
          </div>
        </div>
      </MarketingContainer>
    </section>
  );
}
