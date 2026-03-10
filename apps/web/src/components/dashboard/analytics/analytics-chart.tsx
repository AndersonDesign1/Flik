"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ClientOnly } from "@/components/shared/client-only";
import type { ChartPoint } from "@/lib/data";

interface AnalyticsChartProps {
  data: ChartPoint[];
}

export function AnalyticsChart({ data }: AnalyticsChartProps) {
  if (data.length === 0) {
    return <div className="h-[280px] rounded-lg bg-muted/20" />;
  }

  return (
    <ClientOnly
      fallback={<div className="h-[280px] w-full animate-pulse bg-muted/20" />}
    >
      <ResponsiveContainer height={280} minHeight={0} minWidth={0} width="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
        >
          <defs>
            <linearGradient id="barGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity={1} />
              <stop offset="100%" stopColor="#fb923c" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <CartesianGrid
            stroke="var(--gray-200)"
            strokeDasharray="3 3"
            strokeOpacity={0.4}
            vertical={false}
          />
          <XAxis
            axisLine={false}
            dataKey="name"
            fontSize={11}
            fontWeight={400}
            stroke="var(--gray-400)"
            tickLine={false}
            tickMargin={12}
          />
          <YAxis
            axisLine={false}
            fontSize={11}
            fontWeight={400}
            stroke="var(--gray-400)"
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            tickLine={false}
            width={50}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border border-border bg-background px-3 py-2 shadow-lg">
                    <span className="font-bold text-foreground text-sm tabular-nums">
                      ${payload[0].value?.toLocaleString()}
                    </span>
                  </div>
                );
              }
              return null;
            }}
            cursor={{ fill: "var(--gray-100)", opacity: 0.3 }}
          />
          <Bar dataKey="total" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ClientOnly>
  );
}
