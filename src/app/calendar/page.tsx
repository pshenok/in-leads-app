"use client";

import { useState } from "react";
import { appointments } from "@/lib/mock-data";
import { CalendarStats } from "@/components/calendar/calendar-stats";
import { WeekHeader } from "@/components/calendar/week-header";
import { WeekGrid } from "@/components/calendar/week-grid";
import { DaySelector } from "@/components/calendar/day-selector";

const WEEK_DAYS = [
  "2026-03-09",
  "2026-03-10",
  "2026-03-11",
  "2026-03-12",
  "2026-03-13",
  "2026-03-14",
  "2026-03-15",
];
const TODAY = "2026-03-09";

export default function CalendarPage() {
  const [selectedDay, setSelectedDay] = useState(TODAY);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wider text-gray-900">
          CALENDAR
        </h1>
        <p className="text-gray-500 mt-1">AI-booked appointments</p>
      </div>
      <CalendarStats appointments={appointments} today={TODAY} />
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        <WeekHeader weekDays={WEEK_DAYS} today={TODAY} />
        <DaySelector
          weekDays={WEEK_DAYS}
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
          today={TODAY}
        />
        <WeekGrid
          appointments={appointments}
          weekDays={WEEK_DAYS}
          selectedDay={selectedDay}
          today={TODAY}
        />
      </div>
    </div>
  );
}
