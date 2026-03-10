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
    },
    {
      label: "Confirmed",
      value: confirmedCount.toString(),
      icon: CheckCircle,
    },
    {
      label: "Pending",
      value: pendingCount.toString(),
      icon: Clock,
    },
    {
      label: "Today",
      value: todayCount.toString(),
      icon: Zap,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-gray-200 bg-white p-4 transition-colors duration-200 hover:border-gray-300"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{stat.label}</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <stat.icon className="h-4 w-4 text-gray-600" />
            </div>
          </div>
          <div className="mt-2">
            <span className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-wide text-gray-900">
              {stat.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
