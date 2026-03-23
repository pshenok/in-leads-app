"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const DAY_LABELS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTH_NAMES = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
];

interface WeekHeaderProps {
  weekDays: string[];
  today: string;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onToday: () => void;
  isCurrentWeek: boolean;
}

function formatDateNum(dateStr: string): string {
  return new Date(dateStr + "T12:00:00").getDate().toString();
}

function getWeekTitle(weekDays: string[]): string {
  const first = new Date(weekDays[0] + "T12:00:00");
  const last = new Date(weekDays[6] + "T12:00:00");

  const firstMonth = MONTH_NAMES[first.getMonth()];
  const lastMonth = MONTH_NAMES[last.getMonth()];
  const year = last.getFullYear();

  if (firstMonth === lastMonth) {
    return `${firstMonth} ${first.getDate()} \u2014 ${last.getDate()}, ${year}`;
  }
  return `${firstMonth} ${first.getDate()} \u2014 ${lastMonth} ${last.getDate()}, ${year}`;
}

export function WeekHeader({ weekDays, today, onPrevWeek, onNextWeek, onToday, isCurrentWeek }: WeekHeaderProps) {
  return (
    <div className="border-b border-gray-200 px-4 py-3">
      {/* Week title row */}
      <div className="flex items-center justify-between">
        <button
          onClick={onPrevWeek}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:text-gray-700"
          aria-label="Previous week"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-3">
          <h2 className="font-[family-name:var(--font-display)] text-xl tracking-wider text-gray-900">
            {getWeekTitle(weekDays)}
          </h2>
          {!isCurrentWeek && (
            <button
              onClick={onToday}
              className="rounded-md border border-gray-300 px-2.5 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Today
            </button>
          )}
        </div>
        <button
          onClick={onNextWeek}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:text-gray-700"
          aria-label="Next week"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Day labels — desktop only */}
      <div className="mt-3 hidden lg:grid" style={{ gridTemplateColumns: "60px repeat(7, 1fr)" }}>
        {/* Empty cell for time column alignment */}
        <div />
        {weekDays.map((day, i) => {
          const isToday = day === today;
          const dateNum = formatDateNum(day);

          return (
            <div key={day} className="flex items-center justify-center gap-1.5 py-1">
              <span className="text-xs font-medium text-gray-500">{DAY_LABELS[i]}</span>
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                  isToday
                    ? "bg-gray-900 text-white"
                    : "text-gray-900"
                )}
              >
                {dateNum}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
