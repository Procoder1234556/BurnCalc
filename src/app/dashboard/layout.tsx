import type { Metadata } from "next";
import { DashboardProvider } from "@/components/dashboard/dashboard-provider";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export const metadata: Metadata = {
  title: "Dashboard | BurnCalc",
  description: "Overview, workspace, and metrics for your startup model.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <DashboardShell>{children}</DashboardShell>
    </DashboardProvider>
  );
}
