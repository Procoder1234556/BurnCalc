import Link from "next/link";

export const LEGAL_FOOTER_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
] as const;

const defaultLinkClassName =
  "text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

type LegalFooterLinksProps = {
  className?: string;
  linkClassName?: string;
  separator?: "dot" | "pipe" | "none";
};

export function LegalFooterLinks({
  className,
  linkClassName = defaultLinkClassName,
  separator = "dot",
}: LegalFooterLinksProps) {
  const sep =
    separator === "dot" ? " · " : separator === "pipe" ? " | " : null;

  return (
    <nav aria-label="Legal" className={className}>
      {LEGAL_FOOTER_LINKS.map((item, index) => (
        <span key={item.href}>
          {index > 0 && sep ? (
            <span className="text-muted/60" aria-hidden>
              {sep}
            </span>
          ) : null}
          <Link href={item.href} className={linkClassName}>
            {item.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}
