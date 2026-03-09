import { Users, Flame, Clock, Target } from "lucide-react";
import { leads } from "@/lib/mock-data";

const hotLeads = leads.filter((l) => l.score === "HOT");
const avgResponse = Math.round(
  leads.reduce((sum, l) => sum + l.responseTime, 0) / leads.length
);
const bookedCount = leads.filter((l) => l.status === "booked").length;
const conversionRate = Math.round((bookedCount / leads.length) * 100);

const kpis = [
  {
    label: "Total Leads",
    value: leads.length.toString(),
    trend: "+12% vs last week",
    icon: Users,
  },
  {
    label: "HOT Leads",
    value: hotLeads.length.toString(),
    trend: "+2 this week",
    icon: Flame,
  },
  {
    label: "Avg Response",
    value: `${avgResponse}s`,
    trend: "-8s improvement",
    icon: Clock,
  },
  {
    label: "Conversion Rate",
    value: `${conversionRate}%`,
    trend: "+5% vs last month",
    icon: Target,
  },
];

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
      {kpis.map((kpi) => (
        <div
          key={kpi.label}
          className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:shadow-primary/5"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{kpi.label}</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-amber-500">
              <kpi.icon className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-wide text-foreground">
              {kpi.value}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
            {kpi.trend}
          </div>
        </div>
      ))}
    </div>
  );
}
