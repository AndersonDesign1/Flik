"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import {
  ChartCard,
  ChartTooltip,
  getChartGrid,
  getChartXAxis,
  getChartYAxis,
} from "@/components/shared/chart-card";

interface DataPoint {
  hour: string;
  transactions: number;
  value: number;
}

interface TransactionVolumeChartProps {
  data: DataPoint[];
}

export function TransactionVolumeChart({ data }: TransactionVolumeChartProps) {
  return (
    <ChartCard
      height={260}
      subtitle="Checkout transactions over the last 24 hours"
      title="Transaction Volume"
    >
      <ResponsiveContainer height="100%" width="100%">
        <AreaChart
          data={data}
          margin={{ top: 5, right: 10, left: 5, bottom: 0 }}
        >
          <defs>
            <linearGradient
              id="transactionGradient"
              x1="0"
              x2="0"
              y1="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#f97316" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
            </linearGradient>
          </defs>
          {getChartGrid()}
          {getChartXAxis("hour")}
          {getChartYAxis((v) => v.toLocaleString())}
          <Tooltip
            content={({ active, payload }) => (
              <ChartTooltip
                active={active}
                formatter={(v, name) =>
                  name === "value"
                    ? `$${v.toLocaleString()}`
                    : v.toLocaleString()
                }
                payload={payload}
              />
            )}
          />
          <Area
            activeDot={{
              r: 4,
              strokeWidth: 2,
              stroke: "var(--surface-1)",
              fill: "#f97316",
            }}
            dataKey="transactions"
            fill="url(#transactionGradient)"
            name="transactions"
            stroke="#f97316"
            strokeWidth={2}
            type="monotone"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
