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

const data = [
  { name: "Jan", total: 85_000 },
  { name: "Feb", total: 92_000 },
  { name: "Mar", total: 78_000 },
  { name: "Apr", total: 95_000 },
  { name: "May", total: 180_000 },
  { name: "Jun", total: 145_000 },
  { name: "Jul", total: 125_000 },
  { name: "Aug", total: 135_000 },
  { name: "Sep", total: 155_000 },
  { name: "Oct", total: 142_000 },
  { name: "Nov", total: 165_000 },
  { name: "Dec", total: 195_000 },
];

export function AnalyticsChart() {
  return (
    <ResponsiveContainer height={280} width="100%">
      <BarChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
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
  );
}
