"use client";

import {
  type ProgressBarItem,
  ProgressBarList,
} from "@/components/dashboard/shared/progress-bar-list";

interface CountryData {
  name: string;
  flag: string;
  value: number;
  percent: number;
  color: string;
}

interface CountryStatsProps {
  countries: CountryData[];
  totalValue?: string;
  trend?: string;
}

export function CountryStats({
  countries,
  totalValue = "38,512",
  trend = "+39.22%",
}: CountryStatsProps) {
  const items: ProgressBarItem[] = countries.map((country) => ({
    name: country.name,
    value: country.value,
    percent: country.percent,
    color: country.color,
    icon: country.flag,
  }));

  return (
    <ProgressBarList
      items={items}
      onViewAll={() => {
        // TODO: Implement view all countries
      }}
      title="Country"
      totalValue={totalValue}
      trend={trend}
      trendLabel="last month"
    />
  );
}
