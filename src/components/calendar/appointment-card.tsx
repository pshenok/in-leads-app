import Link from "next/link";
import type { Appointment } from "@/lib/types";
import { cn } from "@/lib/utils";

const scoreBorderColor: Record<string, string> = {
  HOT: "border-l-red-500",
  WARM: "border-l-orange-500",
  COLD: "border-l-gray-400",
};

const statusDot: Record<string, string> = {
  confirmed: "bg-green-500",
  pending: "bg-orange-500",
  completed: "bg-gray-400",
};

interface AppointmentCardProps {
  appointment: Appointment;
  heightPx?: number;
}

export function AppointmentCard({ appointment, heightPx }: AppointmentCardProps) {
  return (
    <Link
      href={`/leads/${appointment.leadId}`}
      className={cn(
        "block rounded-md border-l-[3px] bg-card shadow-sm px-2 py-1.5 transition-colors hover:shadow-md",
        scoreBorderColor[appointment.score]
      )}
      style={heightPx ? { height: `${heightPx}px` } : undefined}
    >
      <div className="flex items-start justify-between gap-1">
        <span className="text-sm font-bold leading-tight text-foreground truncate">
          {appointment.leadName}
        </span>
        <span className={cn("mt-0.5 h-2 w-2 shrink-0 rounded-full", statusDot[appointment.status])} />
      </div>
      <p className="text-xs capitalize text-muted-foreground">{appointment.service}</p>
      <p className="font-[family-name:var(--font-mono)] text-xs text-muted-foreground">
        {appointment.startTime} – {appointment.endTime}
      </p>
    </Link>
  );
}
