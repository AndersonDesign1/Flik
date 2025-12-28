"use client";

import { TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

interface WeekData {
  week: string;
  amount: number;
  percent: number;
}

interface MonthlyEarningsCardProps {
  totalEarnings?: string;
  trend?: string;
  weeks?: WeekData[];
}

const DEFAULT_WEEKS: WeekData[] = [
  { week: "Week 1", amount: 5420, percent: 65 },
  { week: "Week 2", amount: 7230, percent: 85 },
  { week: "Week 3", amount: 6180, percent: 75 },
  { week: "Week 4", amount: 6060, percent: 72 },
];

export function MonthlyEarningsCard({
  totalEarnings = "$24,890.00",
  trend = "+32.5%",
  weeks = DEFAULT_WEEKS,
}: MonthlyEarningsCardProps) {
  return (
    <Card className="lg:col-span-2">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-medium text-muted-foreground text-sm">
            Monthly Earnings
          </h3>
          <div className="mt-1 font-bold text-2xl text-foreground tabular-nums tracking-tight">
            {totalEarnings}
          </div>
          <div className="mt-0.5 flex items-center gap-1.5">
            <span className="flex items-center gap-0.5 font-medium text-emerald-600 text-xs dark:text-emerald-400">
              <TrendingUp className="h-3 w-3" />
              {trend}
            </span>
            <span className="text-muted-foreground text-xs">vs last month</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
          Weekly Breakdown
        </h4>
        {weeks.map((week) => (
          <div className="flex items-center gap-4" key={week.week}>
            <span className="w-16 text-muted-foreground text-sm">
              {week.week}
            </span>
            <div className="flex-1">
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all"
                  style={{ width: `${week.percent}%` }}
                />
              </div>
            </div>
            <span className="w-20 text-right font-semibold text-foreground text-sm tabular-nums">
              ${week.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
