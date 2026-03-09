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
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="mb-6 font-[family-name:var(--font-display)] text-xl tracking-wider">
        LEADS THIS WEEK
      </h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dailyStats} barCategoryGap="20%">
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#888888", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#888888", fontSize: 12 }}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f0f0f",
                border: "1px solid rgba(255, 107, 0, 0.2)",
                borderRadius: "8px",
                color: "#F0EDE8",
              }}
              cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
            />
            <Bar
              dataKey="hot"
              stackId="leads"
              fill="#ef4444"
              radius={[0, 0, 0, 0]}
              name="HOT"
            />
            <Bar
              dataKey="warm"
              stackId="leads"
              fill="#f59e0b"
              radius={[0, 0, 0, 0]}
              name="WARM"
            />
            <Bar
              dataKey="cold"
              stackId="leads"
              fill="#6b7280"
              radius={[4, 4, 0, 0]}
              name="COLD"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
