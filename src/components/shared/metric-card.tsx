import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  // Legacy props
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  // New props from data
  subtext?: string;
  trend?: string;
  trendUp?: boolean;
  primary?: boolean;
  icon?: LucideIcon;
  className?: string;
}

export function MetricCard({
  title,
  value,
  change,
  changeType = "neutral",
  subtext,
  trend,
  trendUp,
  primary,
  icon: Icon,
  className,
}: MetricCardProps) {
  // Use trend/trendUp if provided, otherwise fall back to change/changeType
  const displayChange = trend || change;
  const displayChangeType = trend
    ? trendUp
      ? "positive"
      : "negative"
    : changeType;

  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-white p-5",
        primary && "border-primary/20 bg-primary/5",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium text-gray-500 text-sm">{title}</p>
          <p className="mt-2 font-bold text-2xl text-gray-900 tabular-nums">
            {value}
          </p>
          {displayChange && (
            <p
              className={cn(
                "mt-1 text-sm",
                displayChangeType === "positive" && "text-emerald-600",
                displayChangeType === "negative" && "text-red-600",
                displayChangeType === "neutral" && "text-gray-500"
              )}
            >
              {displayChange}
            </p>
          )}
          {subtext && (
            <p className="mt-0.5 text-gray-400 text-xs">{subtext}</p>
          )}
        </div>
        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
            <Icon className="h-5 w-5 text-gray-600" />
          </div>
        )}
      </div>
    </div>
  );
}
