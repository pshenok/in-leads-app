"use client";

import { cn } from "@/lib/utils";

const DAY_LABELS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

interface DaySelectorProps {
  weekDays: string[];
  selectedDay: string;
  onSelectDay: (day: string) => void;
  today: string;
}

function formatDateNum(dateStr: string): string {
  return new Date(dateStr + "T12:00:00").getDate().toString();
}

export function DaySelector({ weekDays, selectedDay, onSelectDay, today }: DaySelectorProps) {
  return (
    <div className="flex gap-1 overflow-x-auto border-b border-gray-200 px-3 py-2 lg:hidden">
      {weekDays.map((day, i) => {
        const isSelected = day === selectedDay;
        const isToday = day === today;
        const dateNum = formatDateNum(day);

        return (
          <button
            key={day}
            onClick={() => onSelectDay(day)}
            className={cn(
              "flex min-w-[44px] flex-1 flex-col items-center gap-0.5 rounded-lg py-2 text-xs font-medium transition-colors",
              isSelected
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            )}
          >
            <span>{DAY_LABELS[i]}</span>
            <span className="text-sm font-bold">{dateNum}</span>
            {isToday && (
              <span className={cn("h-1 w-1 rounded-full", isSelected ? "bg-white" : "bg-gray-900")} />
            )}
          </button>
        );
      })}
    </div>
  );
}
