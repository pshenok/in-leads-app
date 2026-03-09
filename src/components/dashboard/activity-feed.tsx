import { activityFeed } from "@/lib/mock-data";
import type { ActivityItem } from "@/lib/types";

const dotColors: Record<ActivityItem["type"], string> = {
  booked: "bg-green-400",
  lost: "bg-red-400",
  call: "bg-amber-400",
  score: "bg-amber-400",
  sms: "bg-amber-400",
};

export function ActivityFeed() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="mb-4 font-[family-name:var(--font-display)] text-xl tracking-wider">
        ACTIVITY
      </h2>
      <div className="max-h-[340px] space-y-4 overflow-y-auto pr-2">
        {activityFeed.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <div className="mt-1.5 flex-shrink-0">
              <div
                className={`h-2 w-2 rounded-full ${dotColors[item.type]}`}
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
