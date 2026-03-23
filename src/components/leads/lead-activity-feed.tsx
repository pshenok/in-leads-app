"use client";

import { Phone, BarChart3, MessageSquare, Calendar, XCircle } from "lucide-react";
import type { LeadActivity } from "@/lib/types";

const activityIcons: Record<string, typeof Phone> = {
  call: Phone,
  score: BarChart3,
  sms: MessageSquare,
  booked: Calendar,
  lost: XCircle,
};

function formatTime(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

interface LeadActivityFeedProps {
  activities: LeadActivity[];
}

export function LeadActivityFeed({ activities }: LeadActivityFeedProps) {
  return (
    <div className="border border-gray-200 rounded-xl p-6">
      <h2 className="mb-4 font-[family-name:var(--font-display)] text-xl tracking-wider text-gray-900">
        ACTIVITY
      </h2>
      <div className="space-y-3">
        {activities.map((activity) => {
          const Icon = activityIcons[activity.type] ?? BarChart3;
          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 text-sm"
            >
              <div className="mt-0.5 flex-shrink-0 rounded-full bg-gray-100 p-1.5">
                <Icon className="h-3.5 w-3.5 text-gray-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-700">{activity.message}</p>
                <span className="font-[family-name:var(--font-mono)] text-xs text-gray-400">
                  {formatTime(activity.createdAt)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
