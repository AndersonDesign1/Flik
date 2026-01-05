"use client";

import {
  Bar,
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
  signups: number;
  active: number;
  churned: number;
}

interface CreatorGrowthChartProps {
  data: DataPoint[];
}

export function CreatorGrowthChart({ data }: CreatorGrowthChartProps) {
  const dataWithNetGrowth = data.map((d) => ({
    ...d,
    netGrowth: d.signups - d.churned,
  }));

  return (
    <ChartCard
      height={300}
      subtitle="New signups, active creators, and churn rate"
      title="Creator Growth"
    >
      <ResponsiveContainer height="100%" width="100%">
        <ComposedChart
          data={dataWithNetGrowth}
          margin={{ top: 5, right: 10, left: 5, bottom: 0 }}
        >
          {getChartGrid()}
          {getChartXAxis("month")}
          {getChartYAxis((v) => v.toLocaleString())}
          <Tooltip
            content={({ active, payload }) => (
              <ChartTooltip
                active={active}
                formatter={(v) => v.toLocaleString()}
                payload={payload}
              />
            )}
          />
          <Bar
            barSize={12}
            dataKey="signups"
            fill="#10b981"
            name="signups"
            radius={[4, 4, 0, 0]}
            stackId="a"
          />
          <Bar
            barSize={12}
            dataKey="churned"
            fill="#ef4444"
            name="churned"
            radius={[4, 4, 0, 0]}
            stackId="b"
          />
          <Line
            dataKey="active"
            dot={false}
            name="active"
            stroke="#8b5cf6"
            strokeWidth={2}
            type="monotone"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
