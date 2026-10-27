import { cn } from "@/lib/utils";

/** shots.so–style browser chrome for static product previews */
export function DeviceBrowserFrame({
  children,
  className,
  title = "BurnCalc",
  url = "burncalc.app/calculator",
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  url?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-[#f4f4f2] shadow-[0_24px_64px_rgba(26,26,26,0.12)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border/80 bg-[#ebebea] px-3 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div
          className="mx-auto flex min-w-0 max-w-[min(100%,280px)] flex-1 items-center justify-center gap-2 rounded-md border border-border/60 bg-white px-3 py-1"
          aria-hidden
        >
          <span className="size-2 shrink-0 rounded-full bg-positive/80" />
          <span className="truncate text-[11px] text-muted">{url}</span>
        </div>
        <span className="w-12 text-right text-[10px] font-medium text-muted sm:w-14">
          {title}
        </span>
      </div>
      <div className="bg-white">{children}</div>
    </div>
  );
}
