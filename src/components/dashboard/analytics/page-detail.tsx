"use client";

import {
  BarChart3,
  Clock,
  ExternalLink,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface PageData {
  path: string;
  title: string;
  views: string;
  bounceRate: string;
  avgTime: string;
  trend: string;
}

interface PageDetailProps {
  page: PageData;
}

export function PageDetail({ page }: PageDetailProps) {
  const trendUp = page.trend.startsWith("+");

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Header */}
      <div className="flex-shrink-0 border-border/40 border-b pb-6">
        <h2 className="truncate font-semibold text-foreground text-lg tracking-tight">
          {page.title}
        </h2>
        <div className="mt-1 flex items-center gap-2">
          <p className="font-mono text-muted-foreground text-sm">{page.path}</p>
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-medium text-xs",
              trendUp
                ? "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
                : "border-red-200 bg-red-50 text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
            )}
          >
            {trendUp ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {page.trend}
          </span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 space-y-6 overflow-y-auto py-6">
        {/* Views Card */}
        <div className="rounded-xl border border-border/40 bg-gradient-to-br from-blue-50 to-indigo-50/50 p-5 dark:from-blue-500/5 dark:to-indigo-500/5">
          <span className="font-medium text-blue-600 text-sm dark:text-blue-400">
            Total Views
          </span>
          <div className="mt-2 font-bold text-3xl text-blue-700 tabular-nums tracking-tight dark:text-blue-300">
            {page.views}
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-3">
          <h3 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
            Performance Metrics
          </h3>
          <div className="divide-y divide-border/40 rounded-xl border border-border/40 bg-card">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <BarChart3 className="h-4 w-4" />
                <span className="text-sm">Bounce Rate</span>
              </div>
              <span className="font-medium text-foreground text-sm">
                {page.bounceRate}
              </span>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Avg. Time on Page</span>
              </div>
              <span className="font-medium text-foreground text-sm">
                {page.avgTime}
              </span>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2.5 text-muted-foreground">
                {trendUp ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span className="text-sm">Trend</span>
              </div>
              <span
                className={cn(
                  "font-medium text-sm",
                  trendUp
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-500"
                )}
              >
                {page.trend} vs last period
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex-shrink-0 space-y-3 border-border/40 border-t pt-6">
        <Button
          className="w-full gap-2"
          onClick={() => window.open(page.path, "_blank")}
          size="lg"
        >
          <ExternalLink className="h-4 w-4" />
          View Page
        </Button>
        <Button
          className="w-full gap-2"
          onClick={() => navigator.clipboard.writeText(page.path)}
          size="lg"
          variant="outline"
        >
          Copy Path
        </Button>
      </div>
    </div>
  );
}
