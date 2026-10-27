import Image from "next/image";
import { MarketingContainer } from "@/components/marketing/container";
import { SectionHeading } from "@/components/marketing/section-heading";
import { TESTIMONIALS } from "@/data/marketing";

export function TestimonialsSection() {
  return (
    <section className="bg-surface-elevated py-20 sm:py-24 lg:py-28">
      <MarketingContainer>
        <SectionHeading align="center" title="What founders and VCs say" />
        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <li
              key={item.name}
              className="flex flex-col rounded-xl border border-border bg-white p-6"
            >
              <p className="flex-1 text-pretty text-sm leading-relaxed text-text">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <Image
                  src={item.image}
                  alt=""
                  width={40}
                  height={40}
                  className="size-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-text">{item.name}</p>
                  <p className="text-xs text-muted">{item.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </MarketingContainer>
    </section>
  );
}
