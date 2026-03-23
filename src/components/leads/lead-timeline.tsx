import type { TimelineEvent } from "@/lib/types";

const eventStyles: Record<string, { dot: string; label: string }> = {
  received: { dot: "bg-blue-500", label: "Lead Received" },
  ai_called: { dot: "bg-amber-500", label: "AI Called" },
  call_completed: { dot: "bg-green-500", label: "Call Completed" },
  appointment_booked: { dot: "bg-emerald-500", label: "Appointment Booked" },
  callback_requested: { dot: "bg-indigo-500", label: "Callback Requested" },
  call_rejected: { dot: "bg-red-500", label: "Call Rejected" },
  sms_sent: { dot: "bg-purple-500", label: "SMS Sent" },
  scored: { dot: "bg-amber-500", label: "Scored" },
  retry: { dot: "bg-yellow-500", label: "Retry" },
};

function formatTime(timeStr: string): string {
  const date = new Date(timeStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

interface LeadTimelineProps {
  timeline?: TimelineEvent[];
}

export function LeadTimeline({ timeline }: LeadTimelineProps) {
  const events = timeline ?? [];

  return (
    <div className="border border-gray-200 rounded-xl p-6">
      <h2 className="mb-6 font-[family-name:var(--font-display)] text-xl tracking-wider text-gray-900">
        TIMELINE
      </h2>
      {events.length === 0 ? (
        <p className="text-sm text-gray-400">No timeline events yet.</p>
      ) : (
        <div className="relative space-y-6">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-200" />

          {events.map((event, i) => {
            const style = eventStyles[event.type] ?? {
              dot: "bg-gray-400",
              label: event.type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
            };

            return (
              <div key={i} className="relative flex gap-4 pl-0">
                <div className="relative z-10 mt-1 flex-shrink-0">
                  <div
                    className={`h-[14px] w-[14px] rounded-full border-2 border-white ${style.dot}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-gray-900">
                    {style.label}
                  </span>
                  {event.detail && (
                    <p className="mt-0.5 text-sm text-gray-500">
                      {event.detail}
                    </p>
                  )}
                  <span className="mt-0.5 block font-[family-name:var(--font-mono)] text-xs text-gray-400">
                    {formatTime(event.time)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
