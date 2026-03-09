import type { TimelineEvent } from "@/lib/types";

const eventStyles: Record<
  TimelineEvent["type"],
  { dot: string; label: string }
> = {
  received: { dot: "bg-blue-500", label: "Lead Received" },
  ai_called: { dot: "bg-amber-500", label: "AI Called" },
  call_completed: { dot: "bg-green-500", label: "Call Completed" },
  sms_sent: { dot: "bg-purple-500", label: "SMS Sent" },
  scored: { dot: "bg-amber-500", label: "Scored" },
  retry: { dot: "bg-yellow-500", label: "Retry" },
};

function formatTime(timeStr: string): string {
  const date = new Date(timeStr);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function getScoredDotColor(detail: string): string {
  if (detail.toLowerCase().includes("hot")) return "bg-red-500";
  if (detail.toLowerCase().includes("warm")) return "bg-amber-500";
  return "bg-gray-400";
}

interface LeadTimelineProps {
  timeline: TimelineEvent[];
}

export function LeadTimeline({ timeline }: LeadTimelineProps) {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm p-6">
      <h2 className="mb-6 font-[family-name:var(--font-display)] text-xl tracking-wider text-foreground">
        TIMELINE
      </h2>
      <div className="relative space-y-6">
        {/* Vertical connecting line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

        {timeline.map((event, i) => {
          const style = eventStyles[event.type];
          const dotColor =
            event.type === "scored"
              ? getScoredDotColor(event.detail)
              : style.dot;

          return (
            <div key={i} className="relative flex gap-4 pl-0">
              {/* Dot */}
              <div className="relative z-10 mt-1 flex-shrink-0">
                <div
                  className={`h-[14px] w-[14px] rounded-full border-2 border-background ${dotColor}`}
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-foreground">
                  {style.label}
                </span>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {event.detail}
                </p>
                <span className="mt-0.5 block font-[family-name:var(--font-mono)] text-xs text-muted-foreground/70">
                  {formatTime(event.time)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
