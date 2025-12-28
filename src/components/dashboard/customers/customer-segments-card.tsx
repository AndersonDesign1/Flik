"use client";

import {
  type ProgressBarItem,
  ProgressBarList,
} from "@/components/dashboard/shared";

interface CustomerSegment {
  name: string;
  value: number;
  percent: number;
  color: string;
}

interface CustomerSegmentsCardProps {
  segments: CustomerSegment[];
  totalValue?: string;
  trend?: string;
}

export function CustomerSegmentsCard({
  segments,
  totalValue = "4,972",
  trend = "+19.08%",
}: CustomerSegmentsCardProps) {
  const items: ProgressBarItem[] = segments.map((segment) => ({
    name: segment.name,
    value: segment.value,
    percent: segment.percent,
    color: segment.color,
  }));

  return (
    <ProgressBarList
      items={items}
      onViewAll={() => {}}
      title="Customer Segments"
      totalValue={totalValue}
      trend={trend}
      trendLabel="last month"
    />
  );
}
