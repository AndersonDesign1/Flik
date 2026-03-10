"use client";

import { ChevronDown } from "lucide-react";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ChartPoint } from "@/lib/data";

interface RevenueChartCardProps {
  totalRevenue: string;
  series: ChartPoint[];
}

export function RevenueChartCard({
  totalRevenue,
  series,
}: RevenueChartCardProps) {
  return (
    <Card className="lg:col-span-2">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-medium text-muted-foreground text-sm">
            Total Revenue
          </h3>
          <div className="mt-1 font-bold text-2xl text-foreground tabular-nums tracking-tight">
            {totalRevenue}
          </div>
        </div>
        <Button className="h-8 gap-1.5 text-xs" size="sm" variant="outline">
          Yearly
          <ChevronDown className="h-3 w-3" />
        </Button>
      </div>
      <OverviewChart data={series} />
    </Card>
  );
}
