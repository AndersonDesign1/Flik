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
    <ResponsiveContainer height={300} width="100%">
      <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorTotal" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="var(--foreground)" stopOpacity={0.1} />
            <stop offset="95%" stopColor="var(--foreground)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          opacity={0.1}
          stroke="var(--foreground)"
          strokeDasharray="4 4"
          vertical={false}
        />
        <XAxis
          axisLine={false}
          dataKey="name"
          fontSize={11}
          stroke="var(--muted-foreground)"
          tickLine={false}
          tickMargin={10}
        />
        <YAxis
          axisLine={false}
          fontSize={11}
          stroke="var(--muted-foreground)"
          tickFormatter={(value) => `$${value}`}
          tickLine={false}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-md border border-border bg-popover px-3 py-1.5 shadow-sm">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[0.65rem] text-muted-foreground uppercase tracking-wider">
                      Revenue
                    </span>
                    <span className="font-bold text-foreground font-mono">
                      ${payload[0].value}
                    </span>
                  </div>
                </div>
              );
            }
            return null;
          }}
          cursor={{ stroke: "var(--muted-foreground)", strokeWidth: 1, strokeDasharray: "4 4" }}
        />
        <Area
          dataKey="total"
          fill="url(#colorTotal)"
          fillOpacity={1}
          stroke="var(--foreground)"
          strokeWidth={1.5}
          type="monotone"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
