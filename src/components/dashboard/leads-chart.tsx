"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { dailyStats } from "@/lib/mock-data";

export function LeadsChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:shadow-primary/5">
      <h2 className="mb-6 font-[family-name:var(--font-display)] text-xl tracking-wider text-foreground">
        LEADS THIS WEEK
      </h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dailyStats} barCategoryGap="20%">
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 12 }}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.06)",
                color: "#1E293B",
              }}
              cursor={{ fill: "rgba(0, 0, 0, 0.04)" }}
            />
            <Bar
              dataKey="hot"
              stackId="leads"
              fill="#DC2626"
              radius={[0, 0, 0, 0]}
              name="HOT"
            />
            <Bar
              dataKey="warm"
              stackId="leads"
              fill="#FF6B00"
              radius={[0, 0, 0, 0]}
              name="WARM"
            />
            <Bar
              dataKey="cold"
              stackId="leads"
              fill="#CBD5E1"
              radius={[4, 4, 0, 0]}
              name="COLD"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
