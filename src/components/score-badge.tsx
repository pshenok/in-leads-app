import { cn } from "@/lib/utils";
import type { LeadScore } from "@/lib/types";

const scoreStyles: Record<LeadScore, string> = {
  HOT: "bg-red-500/20 text-red-400 border-red-500/30",
  WARM: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  COLD: "bg-gray-500/20 text-gray-400 border-gray-500/30",
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
