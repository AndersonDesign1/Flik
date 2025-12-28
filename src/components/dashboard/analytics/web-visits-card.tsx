"use client";

import { Globe, TrendingDown, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

interface WebVisitsCardProps {
  totalVisits?: string;
  trend?: string;
  uniqueVisitors?: string;
  pageViews?: string;
}

export function WebVisitsCard({
  totalVisits = "701.34m",
  trend = "-12.5%",
  uniqueVisitors = "485K",
  pageViews = "1.2M",
}: WebVisitsCardProps) {
  return (
    <Card>
      <h3 className="font-medium text-muted-foreground text-sm">Web Visits</h3>
      <div className="mt-2 font-bold text-3xl text-foreground tabular-nums tracking-tight">
        {totalVisits}
      </div>
      <div className="mt-1 flex items-center gap-1.5">
        <span className="flex items-center gap-0.5 font-medium text-red-500 text-xs">
          <TrendingDown className="h-3 w-3" />
          {trend}
        </span>
        <span className="text-muted-foreground text-xs">vs last month</span>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground text-sm">
              Unique Visitors
            </span>
          </div>
          <span className="font-semibold text-foreground text-sm tabular-nums">
            {uniqueVisitors}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground text-sm">Page Views</span>
          </div>
          <span className="font-semibold text-foreground text-sm tabular-nums">
            {pageViews}
          </span>
        </div>
      </div>
    </Card>
  );
}
