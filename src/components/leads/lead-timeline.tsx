import type { TimelineEvent } from "@/lib/types";

const eventStyles: Record<
  TimelineEvent["type"],
  { dot: string; label: string }
> = {
  received: { dot: "bg-blue-400", label: "Lead Received" },
  ai_called: { dot: "bg-amber-400", label: "AI Called" },
  call_completed: { dot: "bg-green-400", label: "Call Completed" },
  sms_sent: { dot: "bg-purple-400", label: "SMS Sent" },
  scored: { dot: "bg-amber-400", label: "Scored" },
  retry: { dot: "bg-yellow-400", label: "Retry" },
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
  if (detail.toLowerCase().includes("hot")) return "bg-red-400";
  if (detail.toLowerCase().includes("warm")) return "bg-amber-400";
  return "bg-gray-400";
}

interface LeadTimelineProps {
  timeline: TimelineEvent[];
}

export function LeadTimeline({ timeline }: LeadTimelineProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5">
      <h2 className="mb-6 font-[family-name:var(--font-display)] text-xl tracking-wider">
        TIMELINE
      </h2>
      <div className="relative space-y-6">
        {/* Vertical connecting line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px border-l border-dashed border-amber-500/40" />

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
