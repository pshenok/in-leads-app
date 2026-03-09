import { activityFeed } from "@/lib/mock-data";
import type { ActivityItem } from "@/lib/types";

const dotColors: Record<ActivityItem["type"], string> = {
  booked: "bg-green-500",
  lost: "bg-red-500",
  call: "bg-amber-500",
  score: "bg-primary",
  sms: "bg-blue-500",
};

export function ActivityFeed() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:shadow-primary/5">
      <h2 className="mb-4 font-[family-name:var(--font-display)] text-xl tracking-wider text-foreground">
        ACTIVITY
      </h2>
      <div className="relative max-h-[340px] space-y-4 overflow-y-auto pr-2">
        <div className="absolute left-[3px] top-2 bottom-2 w-px bg-border" />
        {activityFeed.map((item) => (
          <div key={item.id} className="relative flex items-start gap-3">
            <div className="relative z-10 mt-1.5 flex-shrink-0">
              <div
                className={`h-2 w-2 rounded-full ring-2 ring-card ${dotColors[item.type]}`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground leading-snug">
                {item.message}
              </p>
              <span className="text-xs text-muted-foreground">
                {item.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
