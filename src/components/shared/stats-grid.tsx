import type { LucideIcon } from "lucide-react";
import { MetricCard } from "@/components/shared/metric-card";

interface Metric {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: LucideIcon;
}

interface StatsGridProps {
  metrics: Metric[];
}

export function StatsGrid({ metrics }: StatsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard
          change={metric.change}
          changeType={metric.changeType}
          icon={metric.icon}
          key={metric.title}
          title={metric.title}
          value={metric.value}
        />
      ))}
    </div>
  );
}
