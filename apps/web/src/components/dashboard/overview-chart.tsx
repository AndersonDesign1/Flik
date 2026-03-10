"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ClientOnly } from "@/components/shared/client-only";
import type { ChartPoint } from "@/lib/data";

interface OverviewChartProps {
  data: ChartPoint[];
}

export function OverviewChart({ data }: OverviewChartProps) {
  if (data.length === 0) {
    return <div className="h-[220px] rounded-lg bg-muted/20" />;
  }

  return (
    <ClientOnly
      fallback={<div className="h-[220px] w-full animate-pulse bg-muted/20" />}
    >
      <ResponsiveContainer height={220} minHeight={0} minWidth={0} width="100%">
        <AreaChart
          data={data}
          margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorTotal" x1="0" x2="0" y1="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--gray-400)"
                stopOpacity={0.15}
              />
              <stop offset="100%" stopColor="var(--gray-400)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            stroke="var(--gray-200)"
            strokeDasharray="3 3"
            strokeOpacity={0.6}
            vertical={false}
          />
          <XAxis
            axisLine={false}
            dataKey="name"
            fontSize={10}
            fontWeight={400}
            stroke="var(--gray-400)"
            tickLine={false}
            tickMargin={8}
          />
          <YAxis
            axisLine={false}
            fontSize={10}
            fontWeight={400}
            stroke="var(--gray-400)"
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            tickLine={false}
            width={40}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-md border border-gray-800 bg-gray-900 px-2.5 py-1.5 shadow-lg dark:border-gray-200 dark:bg-gray-100">
                    <span className="font-semibold text-gray-50 text-xs tabular-nums dark:text-gray-900">
                      ${payload[0].value?.toLocaleString()}
                    </span>
                  </div>
                );
              }
              return null;
            }}
            cursor={{
              stroke: "var(--gray-400)",
              strokeWidth: 1,
              strokeDasharray: "4 4",
              opacity: 0.5,
            }}
          />
          <Area
            activeDot={{
              r: 4,
              strokeWidth: 2,
              stroke: "var(--surface-1)",
              fill: "var(--gray-900)",
            }}
            dataKey="total"
            fill="url(#colorTotal)"
            fillOpacity={1}
            stroke="var(--gray-900)"
            strokeWidth={1.5}
            type="monotone"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ClientOnly>
  );
}
