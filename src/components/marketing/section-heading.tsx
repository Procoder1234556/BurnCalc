import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        align === "center" && "mx-auto max-w-2xl text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-medium tracking-wide text-muted">{eyebrow}</p>
      ) : null}
      <h2
        className={cn(
          "mt-2 font-display text-balance text-[1.75rem] font-semibold leading-tight tracking-tight text-text sm:text-[2rem]",
          align === "center" && "text-center",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-pretty text-[15px] leading-relaxed text-muted sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
