"use client";

import { TrendingDown } from "lucide-react";
import { useState } from "react";
import { AnalyticsChart } from "@/components/dashboard/analytics/analytics-chart";
import { LeadsByStatusCard } from "@/components/dashboard/analytics/leads-by-status-card";
import {
  type PageData,
  PageDetail,
} from "@/components/dashboard/analytics/page-detail";
import { TopPagesTable } from "@/components/dashboard/analytics/top-pages-table";
import { TrafficSourcesCard } from "@/components/dashboard/analytics/traffic-sources-card";
import { WebVisitsCard } from "@/components/dashboard/analytics/web-visits-card";
import { MetricCard } from "@/components/dashboard/shared/metric-card";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import type { AnalyticsData } from "@/lib/data";

interface AnalyticsContentProps {
  data: AnalyticsData;
}

export function AnalyticsContent({ data }: AnalyticsContentProps) {
  const [selectedPage, setSelectedPage] = useState<PageData | null>(null);

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data.metrics.map((item) => (
          <MetricCard key={item.title} {...item} />
        ))}
      </div>

      {/* Chart + Traffic Sources Section */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Revenue Chart - Takes 2 cols */}
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-muted-foreground text-sm">
                Sales Revenue
              </h3>
              <div className="mt-1 font-bold text-2xl text-foreground tabular-nums tracking-tight">
                {data.salesRevenue}
              </div>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="flex items-center gap-0.5 font-medium text-red-500 text-xs">
                  <TrendingDown className="h-3 w-3" />
                  -12.5%
                </span>
                <span className="text-muted-foreground text-xs">
                  vs yesterday
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-lg border border-border/40 bg-surface-2 px-3 py-1.5">
                <span className="text-muted-foreground text-xs">3m growth</span>
                <div className="font-semibold text-emerald-600 text-sm dark:text-emerald-400">
                  +25% ↑
                </div>
              </div>
              <div className="rounded-lg border border-border/40 bg-surface-2 px-3 py-1.5">
                <span className="text-muted-foreground text-xs">6m growth</span>
                <div className="font-semibold text-emerald-600 text-sm dark:text-emerald-400">
                  +25% ↑
                </div>
              </div>
            </div>
          </div>
          <AnalyticsChart />
        </Card>

        <TrafficSourcesCard sources={data.trafficSources} />
      </div>

      {/* Leads by Status + Web Visits */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <LeadsByStatusCard />
        <WebVisitsCard />
      </div>

      {/* Top Pages Table */}
      <TopPagesTable
        onRowClick={setSelectedPage}
        pages={data.topPages as PageData[]}
      />

      {/* Sheet for Page Detail */}
      <Sheet
        onOpenChange={(open) => !open && setSelectedPage(null)}
        open={!!selectedPage}
      >
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          {selectedPage && <PageDetail page={selectedPage} />}
        </SheetContent>
      </Sheet>
    </div>
  );
}
