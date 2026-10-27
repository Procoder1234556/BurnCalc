import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  className?: string;
};

export function PrimaryButton({
  href,
  children,
  variant = "default",
  className,
}: Props) {
  return (
    <Button asChild variant={variant} className={cn("rounded-full", className)}>
      <Link href={href}>{children}</Link>
    </Button>
  );
}
