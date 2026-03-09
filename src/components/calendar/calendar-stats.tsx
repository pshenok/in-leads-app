import { CalendarDays, CheckCircle, Clock, Zap } from "lucide-react";
import type { Appointment } from "@/lib/types";

interface CalendarStatsProps {
  appointments: Appointment[];
  today: string;
}

export function CalendarStats({ appointments, today }: CalendarStatsProps) {
  const totalWeek = appointments.length;
  const confirmedCount = appointments.filter((a) => a.status === "confirmed").length;
  const pendingCount = appointments.filter((a) => a.status === "pending").length;
  const todayCount = appointments.filter((a) => a.date === today).length;

  const stats = [
    {
      label: "This Week",
      value: totalWeek.toString(),
      icon: CalendarDays,
      accent: "text-primary",
    },
    {
      label: "Confirmed",
      value: confirmedCount.toString(),
      icon: CheckCircle,
      accent: "text-green-400",
    },
    {
      label: "Pending",
      value: pendingCount.toString(),
      icon: Clock,
      accent: "text-amber-400",
    },
    {
      label: "Today",
      value: todayCount.toString(),
      icon: Zap,
      accent: "text-primary",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{stat.label}</span>
            <stat.icon className={`h-5 w-5 ${stat.accent}`} />
          </div>
          <div className="mt-2">
            <span className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-wide">
              {stat.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
