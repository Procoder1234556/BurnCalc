import { RevealOnView } from "@/components/landing/reveal-on-view";

const STEPS = [
  {
    title: "Add survival inputs",
    body: "Cash, monthly revenue, and expenses surface burn and runway first.",
  },
  {
    title: "Layer unit economics",
    body: "S&M, new logos, ARPU, margin, and churn unlock CAC, LTV, payback, and Rule of 40.",
  },
  {
    title: "Model the round",
    body: "Pre money, check size, and optional cap table fields show ownership and dilution.",
  },
];

export function HowSection() {
  return (
    <section
      aria-labelledby="how-heading"
      className="mx-auto w-[90%] max-w-[1200px] px-0 py-12 sm:py-16"
    >
      <RevealOnView>
        <h2
          id="how-heading"
          className="max-w-[680px] text-balance text-2xl font-bold text-text sm:text-3xl"
        >
          Three input groups, one live snapshot
        </h2>
        <p className="mt-4 max-w-[680px] text-pretty text-base text-muted">
          Start with what the founder already sent. Add detail only when you have
          it. Empty fields stay honest instead of guessing.
        </p>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="rounded-lg border border-border p-6">
              <p className="font-mono text-2xl font-medium text-primary" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-lg font-semibold text-text">{step.title}</h3>
              <p className="mt-2 text-pretty text-sm text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </RevealOnView>
    </section>
  );
}
