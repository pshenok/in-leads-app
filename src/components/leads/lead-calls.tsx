"use client";

import { Phone, Clock, FileText } from "lucide-react";
import type { LeadCall } from "@/lib/types";

const statusStyles: Record<string, string> = {
  completed: "bg-green-50 text-green-700 border-green-200",
  "in-progress": "bg-blue-50 text-blue-700 border-blue-200",
  queued: "bg-amber-50 text-amber-700 border-amber-200",
  failed: "bg-red-50 text-red-600 border-red-200",
};

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

interface LeadCallsProps {
  calls: LeadCall[];
}

export function LeadCalls({ calls }: LeadCallsProps) {
  return (
    <div className="space-y-3">
      <h2 className="font-[family-name:var(--font-display)] text-xl tracking-wider text-gray-900">
        CALLS
      </h2>
      <div className="space-y-4">
        {calls.map((call) => (
          <div
            key={call.id}
            className="border border-gray-200 rounded-xl p-5 space-y-4"
          >
            {/* Top row: status + date + duration */}
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${statusStyles[call.status] ?? "bg-gray-50 text-gray-600 border-gray-200"}`}
              >
                {call.status}
              </span>
              {call.duration != null && (
                <span className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Clock className="h-3.5 w-3.5 text-gray-400" />
                  {formatDuration(call.duration)}
                </span>
              )}
              <span className="ml-auto font-[family-name:var(--font-mono)] text-xs text-gray-400">
                {formatDate(call.createdAt)}
              </span>
            </div>

            {/* Summary */}
            {call.summary && (
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <FileText className="h-3.5 w-3.5 mt-0.5 text-gray-400 flex-shrink-0" />
                <span>{call.summary}</span>
              </div>
            )}

            {/* Audio player */}
            {call.recordingUrl && (
              <div className="space-y-1.5">
                <span className="font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-wider text-gray-500">
                  Call Recording
                </span>
                <audio
                  controls
                  preload="none"
                  className="w-full h-10"
                  src={call.recordingUrl}
                >
                  Your browser does not support audio playback.
                </audio>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
