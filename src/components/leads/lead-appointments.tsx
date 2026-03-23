"use client";

import { Calendar, Clock, FileText } from "lucide-react";
import type { LeadAppointment } from "@/lib/types";

const statusStyles: Record<string, string> = {
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  completed: "bg-blue-50 text-blue-700 border-blue-200",
  cancelled: "bg-red-50 text-red-600 border-red-200",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface LeadAppointmentsProps {
  appointments: LeadAppointment[];
}

export function LeadAppointments({ appointments }: LeadAppointmentsProps) {
  return (
    <div className="space-y-3">
      <h2 className="font-[family-name:var(--font-display)] text-xl tracking-wider text-gray-900">
        APPOINTMENTS
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className="border border-gray-200 rounded-xl p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${statusStyles[apt.status] ?? "bg-gray-50 text-gray-600 border-gray-200"}`}
              >
                {apt.status}
              </span>
              {apt.service && (
                <span className="text-xs font-medium text-gray-500">
                  {apt.service}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Calendar className="h-3.5 w-3.5 text-gray-400" />
              <span className="font-medium">{formatDate(apt.date)}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-3.5 w-3.5 text-gray-400" />
              <span>
                {apt.startTime} — {apt.endTime}
              </span>
            </div>

            {apt.notes && (
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <FileText className="h-3.5 w-3.5 mt-0.5 text-gray-400 flex-shrink-0" />
                <span>{apt.notes}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
