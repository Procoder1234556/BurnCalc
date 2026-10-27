import {
  Banknote,
  Building2,
  Calendar,
  ChartPie,
  Clock,
  Flame,
  LineChart,
  Percent,
  Scale,
  Slice,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  flame: Flame,
  calendar: Calendar,
  target: Target,
  users: Users,
  scale: Scale,
  clock: Clock,
  "trending-up": TrendingUp,
  percent: Percent,
  "chart-pie": ChartPie,
  banknote: Banknote,
  slice: Slice,
  "line-chart": LineChart,
  building: Building2,
};

export function ToolIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? Flame;
  return <Icon className={className} aria-hidden />;
}
