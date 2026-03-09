import Link from "next/link";
import { getRecentLeads } from "@/lib/mock-data";
import { ScoreBadge } from "@/components/score-badge";

function getRelativeTime(dateStr: string): string {
  const now = new Date("2026-03-09T10:00:00Z");
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

const platformColors: Record<string, string> = {
  Thumbtack: "bg-blue-500/20 text-blue-400",
  Angi: "bg-green-500/20 text-green-400",
  Yelp: "bg-red-500/20 text-red-400",
};

export function RecentLeads() {
  const recentLeads = getRecentLeads(5);

  return (
    <div className="rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5">
      <h2 className="mb-4 font-[family-name:var(--font-display)] text-xl tracking-wider">
        RECENT LEADS
      </h2>
      <div className="space-y-3">
        {recentLeads.map((lead) => (
          <Link
            key={lead.id}
            href={`/leads/${lead.id}`}
            className="flex flex-col gap-2 rounded-lg border border-transparent bg-secondary/50 px-4 py-3 transition-colors hover:border-primary/20 hover:bg-secondary sm:flex-row sm:items-center sm:justify-between sm:gap-4"
          >
            <div className="flex items-center gap-4">
              <div>
                <span className="font-medium text-foreground">
                  {lead.name}
                </span>
                <span className="ml-3 text-sm text-muted-foreground">
                  {lead.service}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${platformColors[lead.platform] ?? ""}`}
              >
                {lead.platform}
              </span>
              <ScoreBadge score={lead.score} />
              <span className="font-[family-name:var(--font-mono)] text-xs text-muted-foreground">
                {lead.responseTime}s
              </span>
              <span className="text-xs text-muted-foreground">
                {getRelativeTime(lead.createdAt)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
