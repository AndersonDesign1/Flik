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

const data = [
  { name: "Jan", total: 12_000 },
  { name: "Feb", total: 15_000 },
  { name: "Mar", total: 18_000 },
  { name: "Apr", total: 22_000 },
  { name: "May", total: 28_000 },
  { name: "Jun", total: 32_000 },
  { name: "Jul", total: 39_952 },
  { name: "Aug", total: 42_000 },
  { name: "Sep", total: 48_000 },
  { name: "Oct", total: 55_000 },
  { name: "Nov", total: 62_000 },
  { name: "Dec", total: 72_000 },
];

export function OverviewChart() {
  return (
    <ResponsiveContainer height={220} width="100%">
      <AreaChart
        data={data}
        margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorTotal" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--gray-400)" stopOpacity={0.15} />
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
  );
}
