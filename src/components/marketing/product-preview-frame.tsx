import { cn } from "@/lib/utils";

export type FrameVariant = "warm" | "elevated" | "subtle" | "cta";

const variants: Record<FrameVariant, string> = {
  warm: "border-border bg-gradient-to-br from-surface-muted/80 via-surface-elevated to-background",
  subtle: "border-border bg-surface-elevated",
  elevated: "border-border bg-white shadow-[0_8px_30px_rgba(26,26,26,0.06)]",
  cta: "border-border bg-surface-muted/50",
};

export function ProductPreviewFrame({
  variant = "warm",
  className,
  children,
  tall,
}: {
  variant?: FrameVariant;
  className?: string;
  children: React.ReactNode;
  tall?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border p-2 sm:p-3",
        tall ? "min-h-[280px] sm:min-h-[400px]" : "min-h-[220px]",
        variants[variant],
        className,
      )}
    >
      <div className="h-full overflow-hidden rounded-lg border border-border bg-white">
        {children}
      </div>
    </div>
  );
}
