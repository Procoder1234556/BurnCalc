import Image from "next/image";
import { MarketingContainer } from "@/components/marketing/container";
import { PrimaryButton } from "@/components/marketing/primary-button";
import { FOUNDER_BULLETS } from "@/data/marketing";
import { SIGNUP_URL } from "@/lib/marketing/links";

const PORTRAIT =
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=85";

export function FounderSection() {
  return (
    <section id="about" className="bg-background py-20 sm:py-24 lg:py-28">
      <MarketingContainer>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] max-h-[480px] overflow-hidden rounded-2xl border border-border bg-surface-elevated">
            <Image
              src={PORTRAIT}
              alt="Founder reviewing financial metrics on a laptop"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="text-balance text-[1.75rem] font-semibold leading-tight tracking-tight text-text sm:text-[2rem]">
              Built for people who need clear numbers fast
            </h2>
            <p className="mt-4 text-pretty text-[15px] leading-relaxed text-muted sm:text-base">
              BurnCalc is a focused workspace for the metrics that show up in
              every pitch deck and partner memo — burn, runway, unit economics,
              and round math — without rebuilding the same spreadsheet every
              week.
            </p>
            <ul className="mt-6 space-y-3">
              {FOUNDER_BULLETS.map((bullet) => (
                <li
                  key={bullet}
                  className="flex gap-2 text-sm text-muted before:mt-2 before:size-1.5 before:shrink-0 before:rounded-full before:bg-text"
                >
                  {bullet}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <PrimaryButton href={SIGNUP_URL}>Open the calculator</PrimaryButton>
            </div>
          </div>
        </div>
      </MarketingContainer>
    </section>
  );
}
