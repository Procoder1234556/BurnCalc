import Link from "next/link";
import { Flame } from "lucide-react";
import { MarketingContainer } from "@/components/marketing/container";
import { Separator } from "@/components/ui/separator";
import { APP_URL } from "@/lib/marketing/links";

const LINKS = {
  Product: [
    { label: "All tools", href: "/tools" },
    { label: "Burn rate", href: "/tools/burn-rate-calculator" },
    { label: "Runway", href: "/tools/runway-calculator" },
    { label: "Workspace", href: APP_URL },
  ],
  Company: [
    { label: "Thoughts", href: "/#thoughts" },
    { label: "Contact", href: "mailto:hello@burncalc.app" },
  ],
  Resources: [
    { label: "LTV:CAC", href: "/tools/ltv-cac-ratio-calculator" },
    { label: "Dilution", href: "/tools/dilution-calculator" },
    { label: "llms.txt", href: "/llms.txt" },
    { label: "FAQ", href: "/#faq" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background pb-12 pt-14">
      <MarketingContainer>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Flame className="size-4" />
              </span>
              <span className="text-sm font-semibold text-text">BurnCalc</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              Simple financial metrics for founders and investors — burn, runway,
              unit economics, and dilution in one calm workspace.
            </p>
          </div>
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <p className="text-xs font-semibold text-text">{group}</p>
              <ul className="mt-3 space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted transition-colors hover:text-text"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col gap-2 text-xs text-muted sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} BurnCalc. All rights reserved.</p>
          <p>For illustration only. Not financial advice.</p>
        </div>
      </MarketingContainer>
    </footer>
  );
}
