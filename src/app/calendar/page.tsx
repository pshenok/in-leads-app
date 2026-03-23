"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import type { Appointment } from "@/lib/types";
import { CalendarStats } from "@/components/calendar/calendar-stats";
import { WeekHeader } from "@/components/calendar/week-header";
import { WeekGrid } from "@/components/calendar/week-grid";
import { DaySelector } from "@/components/calendar/day-selector";

function getWeekDays(offset: number = 0): string[] {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek + offset * 7);

  const days: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
}

function getTodayStr(): string {
  return new Date().toISOString().split("T")[0];
}

export default function CalendarPage() {
  const TODAY = getTodayStr();
  const [weekOffset, setWeekOffset] = useState(0);
  const weekDays = getWeekDays(weekOffset);
  const [selectedDay, setSelectedDay] = useState(TODAY);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const goToPrevWeek = useCallback(() => setWeekOffset((o) => o - 1), []);
  const goToNextWeek = useCallback(() => setWeekOffset((o) => o + 1), []);
  const goToToday = useCallback(() => {
    setWeekOffset(0);
    setSelectedDay(TODAY);
  }, [TODAY]);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const data = await api.appointments.list();
        setAppointments(data);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAppointments();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wider text-gray-900">
          CALENDAR
        </h1>
        <p className="text-gray-500 mt-1">AI-booked appointments</p>
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          Loading...
        </div>
      ) : (
        <>
          <CalendarStats appointments={appointments} today={TODAY} />
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <WeekHeader
              weekDays={weekDays}
              today={TODAY}
              onPrevWeek={goToPrevWeek}
              onNextWeek={goToNextWeek}
              onToday={goToToday}
              isCurrentWeek={weekOffset === 0}
            />
            <DaySelector
              weekDays={weekDays}
              selectedDay={selectedDay}
              onSelectDay={setSelectedDay}
              today={TODAY}
            />
            <WeekGrid
              appointments={appointments}
              weekDays={weekDays}
              selectedDay={selectedDay}
              today={TODAY}
            />
          </div>
        </>
      )}
    </div>
  );
}
