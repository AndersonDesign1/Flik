"use client";

import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  subtext: string;
  icon?: LucideIcon;
  primary?: boolean;
}

export function MetricCard({
  title,
  value,
  trend,
  trendUp = true,
  subtext,
  icon: Icon,
  primary = false,
}: MetricCardProps) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <span className="font-medium text-muted-foreground text-xs">
          {title}
        </span>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </div>
      <div
        className={cn(
          "mt-1.5 font-bold text-foreground tabular-nums tracking-tight",
          primary ? "text-3xl" : "text-2xl"
        )}
      >
        {value}
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        {trend && (
          <span
            className={cn(
              "flex items-center gap-0.5 font-medium text-xs",
              trendUp
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-red-500"
            )}
          >
            {trendUp ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {trend}
          </span>
        )}
        <span className="text-muted-foreground text-xs">{subtext}</span>
      </div>
    </Card>
  );
}
