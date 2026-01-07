"use client";

import Link from "next/link";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ClientOnly } from "@/components/shared/client-only";
import { Card } from "@/components/ui/card";

interface PayoutSummary {
  pending: { count: number; amount: number };
  processing: { count: number; amount: number };
  completed: { count: number; amount: number };
  failed: { count: number; amount: number };
}

interface PayoutStatusChartProps {
  data: PayoutSummary;
  showViewMore?: boolean;
}

const COLORS = {
  pending: "#eab308",
  processing: "#3b82f6",
  completed: "#10b981",
  failed: "#ef4444",
};

export function PayoutStatusChart({
  data,
  showViewMore = true,
}: PayoutStatusChartProps) {
  const chartData = [
    { name: "Pending", value: data.pending.count, color: COLORS.pending },
    {
      name: "Processing",
      value: data.processing.count,
      color: COLORS.processing,
    },
    { name: "Completed", value: data.completed.count, color: COLORS.completed },
    { name: "Failed", value: data.failed.count, color: COLORS.failed },
  ];

  const totalPending = data.pending.amount + data.processing.amount;

  return (
    <Card className="overflow-hidden p-0">
      <div className="flex items-center justify-between border-border/30 border-b px-5 py-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-semibold text-foreground text-sm">
            Payout Queue
          </h3>
          <p className="text-muted-foreground text-xs">
            Payout distribution by status
          </p>
        </div>
        {showViewMore && (
          <Link
            className="font-medium text-muted-foreground text-xs hover:text-foreground"
            href="/admin/payouts"
          >
            View all →
          </Link>
        )}
      </div>
      <div className="p-5" style={{ height: 220 }}>
        <div className="flex h-full items-center gap-6">
          <div className="relative flex-1">
            <ClientOnly
              fallback={
                <div className="h-full w-full animate-pulse bg-muted/20" />
              }
            >
              <ResponsiveContainer
                height={180}
                minHeight={0}
                minWidth={0}
                width="100%"
              >
                <PieChart>
                  <Pie
                    cx="50%"
                    cy="50%"
                    data={chartData}
                    dataKey="value"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={2}
                    strokeWidth={0}
                  >
                    {chartData.map((entry) => (
                      <Cell fill={entry.color} key={entry.name} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!(active && payload?.length)) {
                        return null;
                      }
                      const item = payload[0].payload as (typeof chartData)[0];
                      return (
                        <div className="rounded-lg border border-border bg-background px-3 py-2 shadow-lg">
                          <div className="flex items-center gap-2">
                            <div
                              className="size-2 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="font-medium text-foreground text-xs">
                              {item.name}: {item.value}
                            </span>
                          </div>
                        </div>
                      );
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ClientOnly>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-bold text-foreground text-lg tabular-nums">
                ${(totalPending / 1000).toFixed(0)}K
              </span>
              <span className="text-muted-foreground text-xs">Pending</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {chartData.map((item) => (
              <div className="flex items-center gap-2" key={item.name}>
                <div
                  className="size-3 rounded-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-muted-foreground text-xs">
                  {item.name}
                </span>
                <span className="font-medium text-foreground text-xs tabular-nums">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
