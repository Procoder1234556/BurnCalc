import { cn } from "@/lib/utils";

export function MarketingContainer({
  className,
  children,
  id,
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={cn("mx-auto w-[90%] max-w-[1120px] px-6 sm:px-7", className)}
    >
      {children}
    </div>
  );
}
