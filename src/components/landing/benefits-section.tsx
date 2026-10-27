import { RevealOnView } from "@/components/landing/reveal-on-view";

const BENEFITS = [
  {
    title: "Memo ready in minutes",
    body:
      "Associates paste deck numbers once and get the standard VC snapshot labels partners expect on the first read.",
  },
  {
    title: "Math you can defend",
    body:
      "Every output shows a one line note and a formula hint, so definitions stay visible when someone asks in the room.",
  },
  {
    title: "Your deck stays local",
    body:
      "Calculations run in the browser. Nothing leaves your machine until you copy or export the summary yourself.",
  },
];

export function BenefitsSection() {
  return (
    <section
      aria-labelledby="benefits-heading"
      className="border-y border-border bg-surface/50"
    >
      <div className="mx-auto w-[90%] max-w-[1200px] px-0 py-12 sm:py-16">
        <RevealOnView>
          <h2
            id="benefits-heading"
            className="max-w-[680px] text-balance text-2xl font-bold text-text sm:text-3xl"
          >
            Built for screening calls, not slide decks
          </h2>
          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {BENEFITS.map((item) => (
              <li
                key={item.title}
                className="rounded-lg border border-border bg-surface p-6"
              >
                <h3 className="text-lg font-semibold text-text">{item.title}</h3>
                <p className="mt-3 text-pretty text-sm text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </RevealOnView>
      </div>
    </section>
  );
}
