import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SIGNUP_URL } from "@/lib/marketing/links";

export function PricingCard({
  name,
  price,
  description,
  features,
  cta,
  highlighted,
}: {
  name: string;
  price: number;
  description: string;
  features: readonly string[];
  cta: string;
  highlighted?: boolean;
}) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-xl border border-border bg-white p-6 transition-shadow hover:shadow-[0_6px_20px_rgba(26,26,26,0.04)] motion-reduce:transition-none",
        highlighted && "border-text/20 shadow-[0_8px_30px_rgba(26,26,26,0.08)]",
      )}
    >
      <h3 className="text-sm font-semibold text-text">{name}</h3>
      <p className="mt-3 font-mono text-3xl font-semibold tabular-nums text-text">
        ${price}
        <span className="text-sm font-medium text-muted">/mo</span>
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      <Separator className="my-5" />
      <ul className="flex flex-1 flex-col gap-2 text-sm text-muted">
        {features.map((f) => (
          <li key={f} className="flex gap-2">
            <span className="text-text" aria-hidden>✓</span>
            {f}
          </li>
        ))}
      </ul>
      <Button
        asChild
        variant={highlighted ? "default" : "outline"}
        className="mt-6 w-full"
      >
        <Link href={SIGNUP_URL}>{cta}</Link>
      </Button>
    </article>
  );
}
