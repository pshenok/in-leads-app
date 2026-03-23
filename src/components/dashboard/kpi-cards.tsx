import { Users, Flame, Clock, Target } from "lucide-react";
import type { DashboardStats } from "@/lib/api";

interface KpiCardsProps {
  stats: DashboardStats;
}

export function KpiCards({ stats }: KpiCardsProps) {
  const conversionRate =
    stats.totalLeads > 0
      ? Math.round((stats.bookedCount / stats.totalLeads) * 100)
      : 0;

  const kpis = [
    {
      label: "Total Leads",
      value: stats.totalLeads.toString(),
      icon: Users,
    },
    {
      label: "HOT Leads",
      value: stats.hotCount.toString(),
      icon: Flame,
    },
    {
      label: "Avg Response",
      value: `${stats.avgResponseTime}s`,
      icon: Clock,
    },
    {
      label: "Conversion Rate",
      value: `${conversionRate}%`,
      icon: Target,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
      {kpis.map((kpi) => (
        <div
          key={kpi.label}
          className="rounded-xl border border-gray-200 bg-white p-6 transition-colors duration-200 hover:border-gray-300"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{kpi.label}</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
              <kpi.icon className="h-5 w-5 text-gray-600" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-wide text-gray-900">
              {kpi.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
