"use client";

import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ProgressBarItem {
  name: string;
  value: number;
  percent: number;
  color: string;
  icon?: LucideIcon | string;
}

interface ProgressBarListProps {
  title: string;
  totalValue?: string;
  trend?: string;
  trendLabel?: string;
  items: ProgressBarItem[];
  viewAllLabel?: string;
  onViewAll?: () => void;
  formatValue?: (value: number) => string;
}

export function ProgressBarList({
  title,
  totalValue,
  trend,
  trendLabel,
  items,
  viewAllLabel = "View All",
  onViewAll,
  formatValue = (v) => v.toLocaleString(),
}: ProgressBarListProps) {
  return (
    <Card>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-medium text-muted-foreground text-sm">{title}</h3>
        {onViewAll && (
          <button
            className="flex items-center gap-1 font-medium text-muted-foreground text-xs transition-colors hover:text-foreground"
            onClick={onViewAll}
            type="button"
          >
            {viewAllLabel}
            <ArrowUpRight className="h-3 w-3" />
          </button>
        )}
      </div>

      {totalValue && (
        <div className="font-bold text-2xl text-foreground tabular-nums tracking-tight">
          {totalValue}
        </div>
      )}

      {trend && (
        <div className="mt-0.5 flex items-center gap-1.5">
          <span className="flex items-center gap-0.5 font-medium text-emerald-600 text-xs dark:text-emerald-400">
            <TrendingUp className="h-3 w-3" />
            {trend}
          </span>
          {trendLabel && (
            <span className="text-muted-foreground text-xs">{trendLabel}</span>
          )}
        </div>
      )}

      <div className={cn("space-y-4", (totalValue || trend) && "mt-5")}>
        {items.map((item) => {
          const renderIcon = () => {
            if (typeof item.icon === "string") {
              return <span className="text-base">{item.icon}</span>;
            }
            if (item.icon) {
              return <item.icon className="h-4 w-4 text-muted-foreground" />;
            }
            return null;
          };
          return (
            <div className="space-y-2" key={item.name}>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  {renderIcon()}
                  <span className="font-medium text-foreground">
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 tabular-nums">
                  <span className="text-muted-foreground">
                    {formatValue(item.value)}
                  </span>
                  <span className="text-muted-foreground/60 text-xs">
                    ({item.percent}%)
                  </span>
                </div>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    item.color
                  )}
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
