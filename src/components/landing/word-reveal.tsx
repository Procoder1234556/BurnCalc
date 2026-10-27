"use client";

import { useEffect, useRef } from "react";

const TAGLINE =
  "Seventeen outputs. One screen. Formulas your IC already cites, without mystery cells.";

export function WordRevealSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const words = section.querySelectorAll<HTMLElement>(".word");
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      words.forEach((w) => w.classList.add("is-active"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-active");
          }
        }
      },
      { threshold: 0.6, rootMargin: "-20% 0px -20% 0px" },
    );

    words.forEach((w) => observer.observe(w));
    return () => observer.disconnect();
  }, []);

  const tokens = TAGLINE.split(/\s+/);

  return (
    <section
      ref={sectionRef}
      aria-label="Product tagline"
      className="word-reveal border-y border-border py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[680px] px-[5%] sm:px-6">
        <p className="text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          {tokens.map((word, i) => (
            <span key={i} className="word inline-block pr-[0.28em]">
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
