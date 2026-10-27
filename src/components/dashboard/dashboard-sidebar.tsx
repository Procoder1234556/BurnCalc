"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame } from "lucide-react";
import { DASHBOARD_NAV } from "@/components/dashboard/dashboard-nav";
import { cn } from "@/lib/utils";

export function DashboardSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <Link
        href="/"
        className="flex items-center gap-2.5 px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
        onClick={onNavigate}
      >
        <span
          className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
          aria-hidden
        >
          <Flame className="size-4" />
        </span>
        <div>
          <p className="text-sm font-semibold text-text">BurnCalc</p>
          <p className="text-[11px] text-muted">Dashboard</p>
        </div>
      </Link>

      <nav className="mt-8 flex flex-1 flex-col gap-0.5" aria-label="Dashboard">
        {DASHBOARD_NAV.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-surface-muted font-medium text-text"
                  : "text-muted hover:bg-surface-elevated hover:text-text",
              )}
            >
              <Icon className="size-4 shrink-0 opacity-80" aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <p className="mt-6 px-2 text-[11px] leading-relaxed text-muted">
        Calculations run in your browser. Nothing is sent to a server.
      </p>
    </div>
  );
}
