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
          <linearGradient id="colorTotal" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="var(--foreground)" stopOpacity={0.1} />
            <stop offset="95%" stopColor="var(--foreground)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          opacity={0.5}
          stroke="var(--border)"
          strokeDasharray="3 3"
          vertical={false}
        />
        <XAxis
          axisLine={false}
          dataKey="name"
          fontSize={12}
          stroke="#888888"
          tickLine={false}
          tickMargin={10}
        />
        <YAxis
          axisLine={false}
          fontSize={12}
          stroke="#888888"
          tickFormatter={(value) => `$${value}`}
          tickLine={false}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border border-border bg-popover p-2 shadow-md">
                  <div className="flex flex-col gap-1">
                    <span className="text-[0.70rem] text-muted-foreground uppercase">
                      Revenue
                    </span>
                    <span className="font-bold text-foreground">
                      ${payload[0].value}
                    </span>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Area
          dataKey="total"
          fill="url(#colorTotal)"
          fillOpacity={1}
          stroke="var(--foreground)"
          strokeWidth={2}
          type="monotone"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
