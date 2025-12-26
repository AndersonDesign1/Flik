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
  { name: "Jan", total: 2400 },
  { name: "Feb", total: 1398 },
  { name: "Mar", total: 9800 },
  { name: "Apr", total: 3908 },
  { name: "May", total: 4800 },
  { name: "Jun", total: 3800 },
  { name: "Jul", total: 4300 },
  { name: "Aug", total: 6000 },
  { name: "Sep", total: 5500 },
  { name: "Oct", total: 7000 },
  { name: "Nov", total: 6500 },
  { name: "Dec", total: 8500 },
];

export function OverviewChart() {
  return (
    <ResponsiveContainer height={350} width="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.15} />
            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="var(--foreground)"
          opacity={0.06}
        />
        <XAxis
          dataKey="name"
          stroke="var(--muted-foreground)"
          fontSize={10}
          tickLine={false}
          axisLine={false}
          tickMargin={15}
          fontWeight={500}
        />
        <YAxis
          stroke="var(--muted-foreground)"
          fontSize={10}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
          fontWeight={500}
          width={40}
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
            cursor={{
                stroke: "var(--foreground)",
                strokeWidth: 1,
                strokeDasharray: "4 4",
                opacity: 0.2
            }}
        />
        <Area
          type="monotone"
          dataKey="total"
          stroke="var(--primary)"
          strokeWidth={2.5}
          fillOpacity={1}
          fill="url(#colorTotal)"
          activeDot={{
            r: 4,
            strokeWidth: 0,
            fill: "var(--primary)",
            className: "animate-ping" // Optional: adds a pulse effect if tailwind animate is set, otherwise just a solid dot
          }}
        />
        {/* Secondary Halo Dot for visual polish (static on top of activeDot) */}
        <Area
             type="monotone"
             dataKey="total"
             stroke="none"
             fill="none"
             activeDot={{
                 r: 6,
                 stroke: "var(--background)",
                 strokeWidth: 2,
                 fill: "var(--primary)"
             }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
