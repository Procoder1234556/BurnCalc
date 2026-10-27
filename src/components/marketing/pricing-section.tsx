import Link from "next/link";
import { MarketingContainer } from "@/components/marketing/container";
import { SectionHeading } from "@/components/marketing/section-heading";
import { PricingCard } from "@/components/marketing/pricing-card";
import { PRICING_PLANS } from "@/data/marketing";

export function PricingSection() {
  return (
    <section id="pricing" className="bg-surface-elevated py-20 sm:py-24 lg:py-28">
      <MarketingContainer>
        <SectionHeading
          align="center"
          eyebrow="Pricing"
          title="Calculate your way"
          description="Pick the plan that matches how often you model burn, runway, and rounds."
        />
        <p className="mx-auto mt-4 text-center">
          <Link
            href="#pricing"
            className="text-xs font-medium text-primary underline-offset-2 hover:underline"
          >
            Compare all plans
          </Link>
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-muted">
          Upgrade or downgrade anytime. Free tier limits apply to export frequency.
        </p>
      </MarketingContainer>
    </section>
  );
}
