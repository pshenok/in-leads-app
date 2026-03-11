"use client";

import { useEffect, useState } from "react";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { LeadsChart } from "@/components/dashboard/leads-chart";
import { RecentLeads } from "@/components/dashboard/recent-leads";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { api } from "@/lib/api";
import type { DashboardStats } from "@/lib/api";
import type { Lead, ActivityItem } from "@/lib/types";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsData, leadsData, activityData] = await Promise.all([
          api.dashboard.stats(),
          api.leads.list(),
          api.dashboard.activity(),
        ]);
        setStats(statsData);
        // Sort leads by createdAt descending and take the 5 most recent
        const sorted = [...leadsData]
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5);
        setRecentLeads(sorted);
        setActivity(activityData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wider text-gray-900">
            DASHBOARD
          </h1>
          <p className="mt-1 text-gray-500">Welcome back, Mike</p>
        </div>
        <div className="flex items-center justify-center py-20 text-gray-400">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wider text-gray-900">
          DASHBOARD
        </h1>
        <p className="mt-1 text-gray-500">Welcome back, Mike</p>
      </div>
      {stats && <KpiCards stats={stats} />}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {stats && <LeadsChart dailyStats={stats.dailyStats} />}
        </div>
        <ActivityFeed activity={activity} />
      </div>
      <RecentLeads leads={recentLeads} />
    </div>
  );
}
