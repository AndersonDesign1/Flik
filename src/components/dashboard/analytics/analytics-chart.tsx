"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jul", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Aug", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Sep", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Oct", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Nov", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Dec", total: Math.floor(Math.random() * 5000) + 1000 },
];

export function AnalyticsChart() {
  return (
    <ResponsiveContainer height={350} width="100%">
      <BarChart data={data}>
        <XAxis
          axisLine={false}
          dataKey="name"
          fontSize={10}
          stroke="var(--muted-foreground)"
          tickLine={false}
          tickMargin={15}
          fontWeight={500}
        />
        <YAxis
          axisLine={false}
          fontSize={10}
          stroke="var(--muted-foreground)"
          tickFormatter={(value) => `$${value}`}
          tickLine={false}
          width={40}
          fontWeight={500}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg bg-foreground text-background px-3 py-1.5 shadow-xl">
                  <span className="font-bold font-mono text-xs">
                    ${payload[0].value?.toLocaleString()}
                  </span>
                </div>
              );
            }
            return null;
          }}
          cursor={{ fill: "var(--foreground)", opacity: 0.05 }}
        />
        <Bar
            dataKey="total"
            fill="var(--primary)"
            radius={[4, 4, 4, 4]} // Fully rounded top and bottom for a "pill" look
            fillOpacity={0.9}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
