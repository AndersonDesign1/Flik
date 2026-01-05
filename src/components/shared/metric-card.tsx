import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
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
  const displayChange = trend || change;
  const getDisplayChangeType = () => {
    if (trend) {
      return trendUp ? "positive" : "negative";
    }
    return changeType;
  };
  const displayChangeType = getDisplayChangeType();

  return (
    <div
      className={cn(
        "min-w-0 rounded-xl border border-border bg-card p-5 transition-all hover:shadow-md",
        primary && "border-primary-violet/20 bg-primary-violet-50",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <p className="truncate font-medium text-muted-foreground text-sm">
            {title}
          </p>
          <p className="truncate font-bold text-2xl text-foreground tabular-nums">
            {value}
          </p>
          {displayChange && (
            <p
              className={cn(
                "text-sm",
                displayChangeType === "positive" && "text-accent-teal",
                displayChangeType === "negative" && "text-error-red",
                displayChangeType === "neutral" && "text-muted-foreground"
              )}
            >
              {displayChange}
            </p>
          )}
          {subtext && (
            <p className="text-muted-foreground/60 text-xs">{subtext}</p>
          )}
        </div>
        {Icon && (
          <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
            <Icon className="size-5 text-muted-foreground" />
          </div>
        )}
      </div>
    </div>
  );
}
