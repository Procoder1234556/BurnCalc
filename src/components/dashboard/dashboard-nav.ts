import {
  LayoutDashboard,
  SlidersHorizontal,
  BarChart3,
  Settings,
} from "lucide-react";

export const DASHBOARD_NAV = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Key metrics at a glance",
  },
  {
    label: "Workspace",
    href: "/dashboard/workspace",
    icon: SlidersHorizontal,
    description: "Inputs and live results",
  },
  {
    label: "Metrics",
    href: "/dashboard/metrics",
    icon: BarChart3,
    description: "Full metrics grid",
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    description: "Data and export",
  },
] as const;
