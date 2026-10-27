import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { MarketingContainer } from "@/components/marketing/container";

const PORTRAIT =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=85";

export function Testimonial() {
  return (
    <section className="py-14 sm:py-20">
      <MarketingContainer>
        <div className="grid items-center gap-10 rounded-lg border border-border bg-surface-elevated p-6 sm:grid-cols-[auto_1fr] sm:p-10">
          <div className="relative mx-auto size-32 sm:mx-0 sm:size-40">
            <div
              className="absolute inset-0 border-2 border-primary/60"
              style={{
                clipPath:
                  "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
              }}
              aria-hidden
            />
            <Image
              src={PORTRAIT}
              alt="Portrait of Jordan Ellis, fintech operator"
              width={160}
              height={160}
              className="size-full object-cover"
              style={{
                clipPath:
                  "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
              }}
            />
          </div>
          <div>
            <p className="text-pretty text-sm leading-relaxed text-text sm:text-[15px]">
              “We stopped rebuilding the same burn spreadsheet for every seed deck.
              BurnCalc gives associates a defensible one screen snapshot before the
              partner call.”
            </p>
            <div className="mt-4 flex items-center gap-2">
              <p className="text-sm font-semibold text-text">Jordan Ellis</p>
              <BadgeCheck className="size-4 text-primary" aria-label="Verified" />
            </div>
            <p className="text-xs text-muted">VP Finance, Northline Systems</p>
            <p className="mt-6 text-[10px] uppercase tracking-wide text-muted/80">
              Customer story
            </p>
          </div>
        </div>
      </MarketingContainer>
    </section>
  );
}
