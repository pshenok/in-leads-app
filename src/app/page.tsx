import { KpiCards } from "@/components/dashboard/kpi-cards";
import { LeadsChart } from "@/components/dashboard/leads-chart";
import { RecentLeads } from "@/components/dashboard/recent-leads";
import { ActivityFeed } from "@/components/dashboard/activity-feed";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wider">
          DASHBOARD
        </h1>
        <p className="mt-1 text-muted-foreground">Welcome back, Mike</p>
      </div>
      <KpiCards />
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <LeadsChart />
        </div>
        <ActivityFeed />
      </div>
      <RecentLeads />
    </div>
  );
}
