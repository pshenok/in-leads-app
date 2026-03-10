import { activityFeed } from "@/lib/mock-data";
import type { ActivityItem } from "@/lib/types";

const dotColors: Record<ActivityItem["type"], string> = {
  booked: "bg-green-500",
  lost: "bg-red-500",
  call: "bg-orange-500",
  score: "bg-gray-900",
  sms: "bg-blue-500",
};

export function ActivityFeed() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 transition-colors duration-200 hover:border-gray-300">
      <h2 className="mb-4 font-[family-name:var(--font-display)] text-xl tracking-wider text-gray-900">
        ACTIVITY
      </h2>
      <div className="relative max-h-[340px] space-y-4 overflow-y-auto pr-2">
        <div className="absolute left-[3px] top-2 bottom-2 w-px bg-gray-200" />
        {activityFeed.map((item) => (
          <div key={item.id} className="relative flex items-start gap-3">
            <div className="relative z-10 mt-1.5 flex-shrink-0">
              <div
                className={`h-2 w-2 rounded-full ring-2 ring-white ${dotColors[item.type]}`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 leading-snug">
                {item.message}
              </p>
              <span className="text-xs text-gray-400">
                {item.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
