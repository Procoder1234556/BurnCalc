import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-[90%] max-w-[680px] flex-col justify-center px-0 py-16">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
        404
      </p>
      <h1 className="mt-4 text-balance text-3xl font-bold text-text">
        This page is not in the model
      </h1>
      <p className="mt-4 text-pretty text-base text-muted">
        The URL does not match a route in BurnCalc. Head back to the calculator
        workspace to keep working through the numbers.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex w-fit min-h-11 items-center justify-center rounded-md bg-primary px-3 py-2 text-base font-semibold text-primary-foreground transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        Back to BurnCalc
      </Link>
    </main>
  );
}
