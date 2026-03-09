import { cn } from "@/lib/utils";
import type { LeadScore } from "@/lib/types";

const scoreStyles: Record<LeadScore, string> = {
  HOT: "bg-red-50 text-red-600 border-red-200",
  WARM: "bg-orange-50 text-orange-600 border-orange-200",
  COLD: "bg-gray-100 text-gray-500 border-gray-300",
};

interface ScoreBadgeProps {
  score: LeadScore;
  size?: "sm" | "md";
}

export function ScoreBadge({ score, size = "sm" }: ScoreBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full border font-[family-name:var(--font-mono)] text-xs font-medium uppercase transition-transform duration-200 hover:scale-110",
        scoreStyles[score],
        size === "sm" ? "px-2 py-0.5" : "px-3 py-1"
      )}
    >
      {score}
    </span>
  );
}
