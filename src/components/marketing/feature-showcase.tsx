import Link from "next/link";
import { MarketingContainer } from "@/components/marketing/container";
import { CalculatorMockup, type MockupVariant } from "@/components/marketing/calculator-mockup";
import { ProductPreviewFrame, type FrameVariant } from "@/components/marketing/product-preview-frame";
import { Button } from "@/components/ui/button";
import { SIGNUP_URL } from "@/lib/marketing/links";

export function FeatureShowcase({
  eyebrow,
  title,
  description,
  ctaLabel,
  frameVariant,
  mockupVariant,
}: {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  frameVariant: FrameVariant;
  mockupVariant: MockupVariant;
}) {
  return (
    <div className="py-14 sm:py-20 lg:py-24">
      <MarketingContainer>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
              {eyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-bold uppercase leading-tight tracking-tight text-text sm:text-3xl">
              {title}
            </h2>
            <p className="mt-3 text-pretty text-sm text-muted sm:text-[15px]">{description}</p>
          </div>
          <Button asChild variant="outline" className="w-fit shrink-0 rounded-md">
            <Link href={SIGNUP_URL}>{ctaLabel}</Link>
          </Button>
        </div>
        <div className="mt-8">
          <ProductPreviewFrame variant={frameVariant} tall>
            <CalculatorMockup variant={mockupVariant} />
          </ProductPreviewFrame>
        </div>
      </MarketingContainer>
    </div>
  );
}
