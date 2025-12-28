"use client";

import { Globe } from "lucide-react";
import {
  type ProgressBarItem,
  ProgressBarList,
} from "@/components/dashboard/shared";

interface TrafficSource {
  name: string;
  value: number;
  percent: number;
  color: string;
}

interface TrafficSourcesCardProps {
  sources: TrafficSource[];
  totalValue?: string;
  trend?: string;
}

export function TrafficSourcesCard({
  sources,
  totalValue = "328,110",
  trend = "+18.2%",
}: TrafficSourcesCardProps) {
  const items: ProgressBarItem[] = sources.map((source) => ({
    name: source.name,
    value: source.value,
    percent: source.percent,
    color: source.color,
    icon: Globe,
  }));

  return (
    <ProgressBarList
      items={items}
      onViewAll={() => {}}
      title="Traffic Sources"
      totalValue={totalValue}
      trend={trend}
      trendLabel="last month"
    />
  );
}
