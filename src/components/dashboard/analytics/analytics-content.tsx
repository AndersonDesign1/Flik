"use client";

import { TrendingDown } from "lucide-react";
import { useState } from "react";
import {
  AnalyticsChart,
  LeadsByStatusCard,
  type PageData,
  PageDetail,
  TopPagesTable,
  TrafficSourcesCard,
  WebVisitsCard,
} from "@/components/dashboard/analytics";
import { MetricCard } from "@/components/dashboard/shared";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const METRICS = [
  {
    title: "Total Traffic",
    value: "485,000",
    trend: "+12.5%",
    trendUp: true,
    subtext: "vs Last Month",
  },
  {
    title: "Conversion Rate",
    value: "18.5%",
    trend: "-2.3%",
    trendUp: false,
    subtext: "vs Last Month",
  },
  {
    title: "Engaged Sessions",
    value: "92,450",
    trend: "+25%",
    trendUp: true,
    subtext: "vs Last Month",
  },
  {
    title: "Avg. Session Duration",
    value: "4m 32s",
    trend: "+18%",
    trendUp: true,
    subtext: "vs Last Month",
  },
];

const TRAFFIC_SOURCES = [
  {
    name: "Organic Search",
    value: 156_420,
    percent: 85,
    color: "bg-blue-500",
  },
  {
    name: "Direct Traffic",
    value: 98_340,
    percent: 65,
    color: "bg-indigo-500",
  },
  {
    name: "Referral",
    value: 45_200,
    percent: 40,
    color: "bg-emerald-500",
  },
  {
    name: "Social Media",
    value: 28_150,
    percent: 25,
    color: "bg-amber-500",
  },
];

const TOP_PAGES: PageData[] = [
  {
    path: "/products",
    title: "Products Page",
    views: "45,230",
    bounceRate: "32%",
    avgTime: "3m 45s",
    trend: "+12%",
  },
  {
    path: "/checkout",
    title: "Checkout Flow",
    views: "28,450",
    bounceRate: "18%",
    avgTime: "5m 12s",
    trend: "+8%",
  },
  {
    path: "/",
    title: "Homepage",
    views: "125,800",
    bounceRate: "45%",
    avgTime: "1m 30s",
    trend: "+15%",
  },
  {
    path: "/categories",
    title: "Categories",
    views: "38,920",
    bounceRate: "38%",
    avgTime: "2m 15s",
    trend: "-3%",
  },
];

export function AnalyticsContent() {
  const [selectedPage, setSelectedPage] = useState<PageData | null>(null);

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {METRICS.map((item) => (
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
                $1,631,241
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

        <TrafficSourcesCard sources={TRAFFIC_SOURCES} />
      </div>

      {/* Leads by Status + Web Visits */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <LeadsByStatusCard />
        <WebVisitsCard />
      </div>

      {/* Top Pages Table */}
      <TopPagesTable onRowClick={setSelectedPage} pages={TOP_PAGES} />

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
