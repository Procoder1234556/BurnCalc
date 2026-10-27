"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Jitter.video–style staggered entrance (CSS spring, no runtime dep) */
export function JitterReveal({
  children,
  className,
  delayMs = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  as?: "div" | "li" | "section";
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Comp = as;
  return (
    <Comp
      ref={ref as never}
      className={cn(
        "jitter-reveal",
        visible && "jitter-reveal--in",
        className,
      )}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      {children}
    </Comp>
  );
}

export function JitterStagger({
  children,
  className,
  staggerMs = 80,
}: {
  children: React.ReactNode[];
  className?: string;
  staggerMs?: number;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <JitterReveal key={i} delayMs={i * staggerMs}>
          {child}
        </JitterReveal>
      ))}
    </div>
  );
}
