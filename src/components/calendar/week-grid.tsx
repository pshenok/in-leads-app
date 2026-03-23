"use client";

import { useMemo } from "react";
import type { Appointment } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AppointmentCard } from "./appointment-card";

const HOURS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const ROW_HEIGHT = 72; // px per hour

function formatHour(h: number): string {
  if (h === 0) return "12 AM";
  if (h < 12) return `${h} AM`;
  if (h === 12) return "12 PM";
  return `${h - 12} PM`;
}

function parseTime(t: string): { hour: number; minute: number } {
  const [h, m] = t.split(":").map(Number);
  return { hour: h, minute: m };
}

function getDurationHours(start: string, end: string): number {
  const s = parseTime(start);
  const e = parseTime(end);
  return (e.hour * 60 + e.minute - (s.hour * 60 + s.minute)) / 60;
}

interface WeekGridProps {
  appointments: Appointment[];
  weekDays: string[];
  selectedDay: string;
  today: string;
}

export function WeekGrid({ appointments, weekDays, selectedDay, today }: WeekGridProps) {
  const appointmentsByDay = useMemo(() => {
    const map: Record<string, Appointment[]> = {};
    for (const day of weekDays) {
      map[day] = appointments
        .filter((a) => (a.date || "").split("T")[0] === day)
        .sort((a, b) => a.startTime.localeCompare(b.startTime));
    }
    return map;
  }, [appointments, weekDays]);

  return (
    <>
      {/* Desktop: full week grid */}
      <div className="hidden lg:block overflow-x-auto">
        <div
          className="relative min-w-[800px]"
          style={{
            display: "grid",
            gridTemplateColumns: "60px repeat(7, 1fr)",
          }}
        >
          {/* Render hour rows across all columns */}
          {HOURS.map((hour) => (
            <div key={`row-${hour}`} className="contents">
              {/* Time label */}
              <div
                className="flex items-start justify-end pr-3 pt-1 text-xs text-gray-400 font-[family-name:var(--font-mono)] border-b border-gray-200"
                style={{ height: `${ROW_HEIGHT}px` }}
              >
                {formatHour(hour)}
              </div>
              {/* Day cells */}
              {weekDays.map((day) => {
                const isToday = day === today;
                const dayAppointments = appointmentsByDay[day]?.filter((a) => {
                  const { hour: startHour } = parseTime(a.startTime);
                  return startHour === hour;
                }) || [];

                return (
                  <div
                    key={`${day}-${hour}`}
                    className={cn(
                      "relative border-b border-l border-gray-200",
                      isToday && "bg-gray-50"
                    )}
                    style={{ height: `${ROW_HEIGHT}px` }}
                  >
                    {dayAppointments.map((appt) => {
                      const { minute } = parseTime(appt.startTime);
                      const duration = getDurationHours(appt.startTime, appt.endTime);
                      const topOffset = (minute / 60) * ROW_HEIGHT;
                      const heightPx = duration * ROW_HEIGHT - 4;

                      return (
                        <div
                          key={appt.id}
                          className="absolute inset-x-0.5 z-10"
                          style={{ top: `${topOffset}px` }}
                        >
                          <AppointmentCard appointment={appt} heightPx={heightPx} />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: single day view */}
      <div className="block lg:hidden">
        <div>
          {HOURS.map((hour) => {
            const dayAppointments = appointmentsByDay[selectedDay]?.filter((a) => {
              const { hour: startHour } = parseTime(a.startTime);
              return startHour === hour;
            }) || [];

            return (
              <div
                key={`mobile-${hour}`}
                className="grid border-b border-gray-200"
                style={{
                  gridTemplateColumns: "56px 1fr",
                  minHeight: `${ROW_HEIGHT}px`,
                }}
              >
                {/* Time label */}
                <div className="flex items-start justify-end pr-3 pt-1 text-xs text-gray-400 font-[family-name:var(--font-mono)]">
                  {formatHour(hour)}
                </div>
                {/* Appointment slot */}
                <div className="relative border-l border-gray-200">
                  {dayAppointments.map((appt) => {
                    const { minute } = parseTime(appt.startTime);
                    const duration = getDurationHours(appt.startTime, appt.endTime);
                    const topOffset = (minute / 60) * ROW_HEIGHT;
                    const heightPx = duration * ROW_HEIGHT - 4;

                    return (
                      <div
                        key={appt.id}
                        className="absolute inset-x-1 z-10"
                        style={{ top: `${topOffset}px` }}
                      >
                        <AppointmentCard appointment={appt} heightPx={heightPx} />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
