"use client";

import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CreditCard,
  DollarSign,
  Globe,
  Server,
  ShoppingCart,
  Store,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { StatsGrid } from "@/components/shared/stats-grid";
import {
  TimeframeSelector,
  useTimeframe,
} from "@/components/shared/timeframe-selector";
import { Card } from "@/components/ui/card";
import adminData from "@/data/admin-dashboard.json";

const ADMIN_METRICS = [
  {
    title: "Gross Merchandise Value",
    value: adminData.platformMetrics.gmv.formattedValue,
    change: `+${adminData.platformMetrics.gmv.change}% from last month`,
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Net Revenue (10% Take)",
    value: adminData.platformMetrics.netRevenue.formattedValue,
    change: `+${adminData.platformMetrics.netRevenue.change}% from last month`,
    changeType: "positive" as const,
    icon: TrendingUp,
  },
  {
    title: "Active Creators",
    value: adminData.platformMetrics.activeCreators.value.toLocaleString(),
    change: `+${adminData.platformMetrics.activeCreators.change} this month`,
    changeType: "positive" as const,
    icon: Store,
  },
  {
    title: "Transactions (24h)",
    value: adminData.platformMetrics.transactionVolume.last24h.toLocaleString(),
    change: `+${adminData.platformMetrics.transactionVolume.change}% vs yesterday`,
    changeType: "positive" as const,
    icon: ShoppingCart,
  },
];

// Quick links data
const quickLinks = [
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    value: adminData.platformMetrics.gmv.formattedValue,
    label: "Total GMV",
    color: "text-primary-violet",
  },
  {
    title: "Payouts",
    href: "/admin/payouts",
    icon: CreditCard,
    value: `$${(adminData.payoutQueue.summary.pending.amount / 1000).toFixed(0)}K`,
    label: "Pending",
    color: "text-blue-500",
  },
  {
    title: "Disputes",
    href: "/admin/disputes",
    icon: AlertTriangle,
    value: `${adminData.disputesAndRefunds.disputeRate}%`,
    label: "Rate",
    color: "text-amber-500",
  },
  {
    title: "Health",
    href: "/admin/platform-health",
    icon: Server,
    value: `${adminData.platformHealth.apiUptime}%`,
    label: "Uptime",
    color: "text-emerald-500",
  },
  {
    title: "Tax",
    href: "/admin/tax-compliance",
    icon: Globe,
    value: `$${(adminData.taxVatTracking.totalCollected / 1000).toFixed(0)}K`,
    label: "Collected",
    color: "text-cyan-500",
  },
];

function getStatusBadgeColor(status: string) {
  if (status === "active") {
    return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400";
  }
  if (status === "pending") {
    return "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400";
  }
  return "bg-muted text-muted-foreground";
}

export default function AdminDashboardPage() {
  const { timeframe, setTimeframe } = useTimeframe("12m");

  // Filter data based on timeframe
  const chartData = useMemo(() => {
    const fullData = adminData.gmvRevenueTimeSeries;
    if (timeframe === "12m") {
      return fullData;
    }
    if (timeframe === "90d") {
      return fullData.slice(-3);
    }
    // For 30d, show last 4 weeks as individual points
    return fullData.slice(-2);
  }, [timeframe]);

  return (
    <div className="flex w-full min-w-0 flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-2xl text-foreground">
          Platform Command Center
        </h2>
        <p className="text-muted-foreground text-sm">
          Quick overview of platform health. Click any section to dive deeper.
        </p>
      </div>

      {/* Hero Metrics */}
      <StatsGrid metrics={ADMIN_METRICS} />

      {/* Quick Links Row - Horizontal compact design */}
      <div className="grid w-full grid-cols-2 gap-2 rounded-xl border border-border/50 bg-muted/30 p-2 md:grid-cols-3 lg:grid-cols-5">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              className="group flex items-center gap-3 rounded-lg px-3 py-3 transition-all hover:bg-background hover:shadow-sm"
              href={link.href}
              key={link.title}
            >
              <Icon className={`size-4 ${link.color}`} />
              <div className="flex flex-col">
                <span className="font-semibold text-foreground text-sm tabular-nums">
                  {link.value}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {link.title}
                </span>
              </div>
              <ArrowRight className="ml-auto size-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          );
        })}
      </div>

      {/* Main Content - Chart + Activity */}
      <div className="grid w-full min-w-0 gap-4 lg:grid-cols-3">
        {/* Revenue Trend Chart */}
        <Card className="min-w-0 overflow-hidden p-0 lg:col-span-2">
          <div className="flex items-center justify-between border-border/30 border-b px-5 py-4">
            <div>
              <h3 className="font-semibold text-foreground text-sm">
                Revenue Trend
              </h3>
              <p className="text-muted-foreground text-xs">
                GMV over the last{" "}
                {timeframe === "12m" ? "12 months" : timeframe}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <TimeframeSelector
                onChange={setTimeframe}
                options={["30d", "90d", "12m"]}
                value={timeframe}
              />
              <Link
                className="flex items-center gap-1 font-medium text-primary-violet text-xs hover:underline"
                href="/admin/analytics"
              >
                View details
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>
          <div className="min-w-0 p-4" style={{ height: 220 }}>
            <ResponsiveContainer height="100%" width="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="gmvFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  axisLine={false}
                  dataKey="month"
                  fontSize={10}
                  stroke="var(--gray-400)"
                  tickLine={false}
                />
                <YAxis
                  axisLine={false}
                  domain={[0, "auto"]}
                  fontSize={9}
                  stroke="var(--gray-400)"
                  tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`}
                  tickLine={false}
                  width={40}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (!(active && payload?.length)) {
                      return null;
                    }
                    return (
                      <div className="rounded-lg border border-border bg-background px-3 py-2 shadow-lg">
                        <p className="font-semibold text-foreground text-sm tabular-nums">
                          $
                          {(
                            (payload[0].value as number) / 1000
                          ).toLocaleString()}
                          K
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {payload[0].payload.month}
                        </p>
                      </div>
                    );
                  }}
                />
                <Area
                  dataKey="gmv"
                  fill="url(#gmvFill)"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  type="monotone"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Top Performers - Compact list */}
        <Card className="overflow-hidden p-0">
          <div className="flex items-center justify-between border-border/30 border-b px-5 py-4">
            <h3 className="font-semibold text-foreground text-sm">
              Top Performers
            </h3>
            <Link
              className="font-medium text-primary-violet text-xs hover:underline"
              href="/admin/analytics"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-border/30">
            {adminData.topPerformers.slice(0, 5).map((performer, index) => (
              <div
                className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-muted/30"
                key={performer.id}
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                  {index + 1}
                </span>
                <div className="flex flex-1 flex-col overflow-hidden">
                  <span className="truncate font-medium text-foreground text-sm">
                    {performer.name}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {performer.category}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-semibold text-foreground text-sm tabular-nums">
                    ${(performer.gmv / 1000).toFixed(0)}K
                  </span>
                  <span
                    className={`text-xs tabular-nums ${performer.trend >= 0 ? "text-emerald-500" : "text-red-500"}`}
                  >
                    {performer.trend >= 0 ? "+" : ""}
                    {performer.trend}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* New Sellers - Grid layout */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold text-foreground text-sm">New Sellers</h3>
          <Link
            className="font-medium text-primary-violet text-xs hover:underline"
            href="/admin/sellers"
          >
            View all →
          </Link>
        </div>
        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {adminData.recentSellers.slice(0, 3).map((seller) => (
            <div
              className="flex min-w-0 items-center gap-2 rounded-lg border border-border/50 bg-card p-3 transition-colors hover:border-border"
              key={seller.id}
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-violet font-medium text-white text-xs">
                {seller.name.charAt(0)}
              </div>
              <div className="flex flex-1 flex-col overflow-hidden">
                <span className="truncate font-medium text-foreground text-sm">
                  {seller.name}
                </span>
                <span className="text-muted-foreground text-xs">
                  {seller.category}
                </span>
              </div>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 font-medium text-xs capitalize ${getStatusBadgeColor(seller.status)}`}
              >
                {seller.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
