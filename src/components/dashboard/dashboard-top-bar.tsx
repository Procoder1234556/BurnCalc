"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Copy, Download, Menu, RotateCcw } from "lucide-react";
import { DASHBOARD_NAV } from "@/components/dashboard/dashboard-nav";
import { useDashboard } from "@/components/dashboard/dashboard-provider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

function titleForPath(pathname: string): string {
  const match = DASHBOARD_NAV.find(
    (n) => pathname === n.href || pathname.startsWith(`${n.href}/`),
  );
  return match?.label ?? "Dashboard";
}

export function DashboardTopBar() {
  const pathname = usePathname();
  const { copySummary, exportSummary, exportSummaryPdf, copyLabel, reset } = useDashboard();
  const title = titleForPath(pathname);

  return (
    <header
      className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border bg-background/90 px-4 backdrop-blur-md sm:px-6"
    >
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              aria-label="Open navigation"
            >
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[min(100%,280px)] p-4">
            <DashboardSidebar />
          </SheetContent>
        </Sheet>
        <div>
          <h1 className="font-display text-base font-semibold text-text sm:text-lg">
            {title}
          </h1>
          <p className="hidden text-xs text-muted sm:block">
            {DASHBOARD_NAV.find((n) => n.label === title)?.description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="hidden sm:inline-flex"
          onClick={() => reset()}
        >
          <RotateCcw className="size-4" aria-hidden />
          Reset
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => copySummary()}>
          <Copy className="size-4" aria-hidden />
          <span className="hidden sm:inline">{copyLabel}</span>
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => exportSummary()}>
          <Download className="size-4" aria-hidden />
          <span className="hidden sm:inline">TXT</span>
        </Button>
        <Button type="button" size="sm" onClick={() => exportSummaryPdf()}>
          <Download className="size-4" aria-hidden />
          <span className="hidden sm:inline">PDF</span>
        </Button>
        <Link
          href="/"
          className="hidden text-xs font-medium text-muted hover:text-text md:inline"
        >
          Marketing site
        </Link>
      </div>
    </header>
  );
}
