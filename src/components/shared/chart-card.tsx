"use client";

import type { ReactNode } from "react";
import { CartesianGrid, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
  height?: number;
}

export function ChartCard({
  title,
  subtitle,
  children,
  className,
  headerAction,
  height = 280,
}: ChartCardProps) {
  return (
    <Card className={cn("overflow-hidden p-0", className)}>
      <div className="flex items-center justify-between border-border/30 border-b px-5 py-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-semibold text-foreground text-sm">{title}</h3>
          {subtitle && (
            <p className="text-muted-foreground text-xs">{subtitle}</p>
          )}
        </div>
        {headerAction}
      </div>
      <div className="p-5" style={{ height }}>
        {children}
      </div>
    </Card>
  );
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: ReadonlyArray<{ value?: number; name?: string; color?: string }>;
  formatter?: (value: number, name: string) => string;
}

export function ChartTooltip({
  active,
  payload,
  formatter = (v) => `$${v.toLocaleString()}`,
}: ChartTooltipProps) {
  if (!(active && payload?.length)) {
    return null;
  }

  return (
    <div className="rounded-lg border border-border bg-background px-3 py-2 shadow-lg">
      <div className="flex flex-col gap-1">
        {payload.map((item) => (
          <div className="flex items-center gap-2" key={item.name}>
            <div
              className="size-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="font-medium text-foreground text-xs capitalize">
              {item.name}:
            </span>
            <span className="font-bold text-foreground text-xs tabular-nums">
              {formatter(item.value ?? 0, item.name ?? "")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function getChartGrid(show = true) {
  if (!show) {
    return null;
  }
  return (
    <CartesianGrid
      stroke="var(--gray-200)"
      strokeDasharray="3 3"
      strokeOpacity={0.4}
      vertical={false}
    />
  );
}

export function getChartXAxis(dataKey = "name") {
  return (
    <XAxis
      axisLine={false}
      dataKey={dataKey}
      fontSize={11}
      fontWeight={400}
      stroke="var(--gray-400)"
      tickLine={false}
      tickMargin={12}
    />
  );
}

export function getChartYAxis(formatter?: (value: number) => string) {
  return (
    <YAxis
      axisLine={false}
      fontSize={11}
      fontWeight={400}
      stroke="var(--gray-400)"
      tickFormatter={formatter}
      tickLine={false}
      width={50}
    />
  );
}
