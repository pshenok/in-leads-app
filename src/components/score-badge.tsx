import { cn } from "@/lib/utils";
import type { LeadScore } from "@/lib/types";

/* ── Score colors ─────────────────────────────────────────────── */

const scoreConfig: Record<string, { dot: string; badge: string; label: string }> = {
  HOT:  { dot: "bg-red-500",    badge: "bg-red-50 text-red-700 border-red-200",       label: "Hot" },
  WARM: { dot: "bg-orange-400", badge: "bg-orange-50 text-orange-700 border-orange-200", label: "Warm" },
  COLD: { dot: "bg-gray-300",   badge: "bg-gray-100 text-gray-500 border-gray-200",    label: "Cold" },
};

function getConfig(score: LeadScore) {
  return scoreConfig[score?.toUpperCase?.()] ?? scoreConfig.COLD;
}

/* ── Badge variant (pill with text) ───────────────────────────── */

interface ScoreBadgeProps {
  score: LeadScore;
  size?: "sm" | "md";
}

export function ScoreBadge({ score, size = "sm" }: ScoreBadgeProps) {
  const cfg = getConfig(score);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium uppercase tracking-wide",
        cfg.badge,
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", cfg.dot)} />
      {cfg.label}
    </span>
  );
}

/* ── Dot-only variant (for compact cards) ─────────────────────── */

export function ScoreDot({ score, className }: { score: LeadScore; className?: string }) {
  const cfg = getConfig(score);
  return (
    <span
      className={cn("w-2 h-2 rounded-full shrink-0", cfg.dot, className)}
      title={cfg.label}
    />
  );
}
