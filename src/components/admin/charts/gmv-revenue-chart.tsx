"use client";

import {
  Area,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  ChartCard,
  ChartTooltip,
  getChartGrid,
  getChartXAxis,
  getChartYAxis,
} from "@/components/shared/chart-card";

interface DataPoint {
  month: string;
  gmv: number;
  revenue: number;
  transactions: number;
}

interface GMVRevenueChartProps {
  data: DataPoint[];
}

export function GMVRevenueChart({ data }: GMVRevenueChartProps) {
  return (
    <ChartCard
      height={320}
      subtitle="Platform gross merchandise value vs your 10% take rate"
      title="GMV vs Net Revenue"
    >
      <ResponsiveContainer height="100%" width="100%">
        <ComposedChart
          data={data}
          margin={{ top: 5, right: 10, left: 5, bottom: 0 }}
        >
          <defs>
            <linearGradient id="gmvGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          {getChartGrid()}
          {getChartXAxis("month")}
          {getChartYAxis((v) => `$${(v / 1_000_000).toFixed(1)}M`)}
          <Tooltip
            content={({ active, payload }) => (
              <ChartTooltip
                active={active}
                formatter={(v, name) =>
                  name === "gmv" || name === "revenue"
                    ? `$${(v / 1000).toFixed(0)}K`
                    : v.toLocaleString()
                }
                payload={payload}
              />
            )}
          />
          <Area
            dataKey="gmv"
            fill="url(#gmvGradient)"
            name="gmv"
            stroke="#8b5cf6"
            strokeWidth={2}
            type="monotone"
          />
          <Line
            dataKey="revenue"
            dot={false}
            name="revenue"
            stroke="#10b981"
            strokeWidth={2}
            type="monotone"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
