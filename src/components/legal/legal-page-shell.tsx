import Link from "next/link";
import type { ReactNode } from "react";

type LegalPageShellProps = {
  children: ReactNode;
};

export function LegalPageShell({ children }: LegalPageShellProps) {
  return (
    <main id="main" className="mx-auto w-[90%] max-w-[680px] px-0 py-16">
      <Link
        href="/"
        className="text-sm text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        ← Back to BurnCalc
      </Link>
      <div className="mt-8">{children}</div>
    </main>
  );
}
