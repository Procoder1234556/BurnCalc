"use client";

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardTopBar } from "@/components/dashboard/dashboard-top-bar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-surface-elevated">
      <aside
        className="hidden w-[240px] shrink-0 border-r border-border bg-background px-4 py-6 lg:block"
        aria-label="Sidebar"
      >
        <DashboardSidebar />
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopBar />
        <main id="main" className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto max-w-[1120px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
