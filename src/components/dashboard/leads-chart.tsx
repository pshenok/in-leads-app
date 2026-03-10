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
    <div className="rounded-xl border border-gray-200 bg-white p-6 transition-colors duration-200 hover:border-gray-300">
      <h2 className="mb-6 font-[family-name:var(--font-display)] text-xl tracking-wider text-gray-900">
        LEADS THIS WEEK
      </h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dailyStats} barCategoryGap="20%">
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                color: "#111827",
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
              fill="#111827"
              radius={[0, 0, 0, 0]}
              name="WARM"
            />
            <Bar
              dataKey="cold"
              stackId="leads"
              fill="#E5E7EB"
              radius={[4, 4, 0, 0]}
              name="COLD"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
