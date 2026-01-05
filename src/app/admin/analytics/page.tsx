"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  DollarSign,
  Package,
  ShoppingCart,
  Store,
  TrendingUp,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  Cell,
  ComposedChart,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { StatsGrid } from "@/components/shared/stats-grid";
import {
  type TimeframeOption,
  TimeframeSelector,
} from "@/components/shared/timeframe-selector";
import { Card } from "@/components/ui/card";
import adminData from "@/data/admin-dashboard.json";

// Platform-wide metrics
const ANALYTICS_METRICS = [
  {
    title: "Total GMV",
    value: adminData.platformMetrics.gmv.formattedValue,
    change: `+${adminData.platformMetrics.gmv.change}% growth`,
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Net Revenue",
    value: adminData.platformMetrics.netRevenue.formattedValue,
    change: `+${adminData.platformMetrics.netRevenue.change}% growth`,
    changeType: "positive" as const,
    icon: TrendingUp,
  },
  {
    title: "Total Creators",
    value: adminData.platformMetrics.totalCreators.value.toLocaleString(),
    change: `+${adminData.platformMetrics.totalCreators.newThisMonth} this month`,
    changeType: "positive" as const,
    icon: Store,
  },
  {
    title: "Total Buyers",
    value: adminData.platformMetrics.totalBuyers.value.toLocaleString(),
    change: `+${adminData.platformMetrics.totalBuyers.newThisMonth.toLocaleString()} this month`,
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Total Products",
    value: adminData.platformMetrics.totalProducts.value.toLocaleString(),
    change: `${adminData.platformMetrics.totalProducts.activeListings.toLocaleString()} active`,
    changeType: "positive" as const,
    icon: Package,
  },
];

// Category data for pie chart
const categoryData = adminData.categories.map((cat, index) => ({
  name: cat.name,
  value: cat.gmv,
  products: cat.products,
  sellers: cat.sellers,
  color: [
    "#8b5cf6",
    "#10b981",
    "#f97316",
    "#3b82f6",
    "#ef4444",
    "#eab308",
    "#ec4899",
    "#06b6d4",
    "#84cc16",
  ][index],
}));

// Monthly GMV data
const monthlyData = adminData.gmvRevenueTimeSeries;

// Hourly transaction data
const hourlyData = adminData.transactionVolumeHourly;

// Creator growth data
const creatorGrowth = adminData.creatorGrowthData.map((d) => ({
  ...d,
  netGrowth: d.signups - d.churned,
}));

function ChartHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-border/30 border-b px-5 py-4">
      <div className="flex flex-col gap-0.5">
        <h3 className="font-semibold text-foreground text-sm">{title}</h3>
        {subtitle && (
          <p className="text-muted-foreground text-xs">{subtitle}</p>
        )}
      </div>
      {actions}
    </div>
  );
}

function CustomTooltip({
  active,
  payload,
  formatter,
}: {
  active?: boolean;
  payload?: ReadonlyArray<{ value?: number; name?: string; color?: string }>;
  formatter?: (value: number, name: string) => string;
}) {
  if (!(active && payload?.length)) {
    return null;
  }

  return (
    <div className="rounded-lg border border-border bg-background px-3 py-2 shadow-lg">
      <div className="flex flex-col gap-1">
        {payload.map((item) => (
          <div className="flex items-center gap-2" key={item.name}>
            <div
              className="size-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="font-medium text-foreground text-xs capitalize">
              {item.name}:
            </span>
            <span className="font-bold text-foreground text-xs tabular-nums">
              {formatter
                ? formatter(item.value ?? 0, item.name ?? "")
                : item.value?.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatTimeframeLabel(tf: TimeframeOption): string {
  const labels: Record<TimeframeOption, string> = {
    "24h": "24 hours",
    "7d": "7 days",
    "30d": "30 days",
    "90d": "90 days",
    "12m": "12 months",
    ytd: "year to date",
  };
  return labels[tf];
}

export default function AnalyticsPage() {
  const [revenueTimeframe, setRevenueTimeframe] =
    useState<TimeframeOption>("12m");
  const [transactionsTimeframe, setTransactionsTimeframe] =
    useState<TimeframeOption>("24h");
  const [creatorTimeframe, setCreatorTimeframe] =
    useState<TimeframeOption>("12m");

  // Filter revenue data based on timeframe
  const revenueData = useMemo(() => {
    if (revenueTimeframe === "12m") {
      return monthlyData;
    }
    if (revenueTimeframe === "90d") {
      return monthlyData.slice(-3);
    }
    return monthlyData.slice(-2); // At least 2 points for smooth chart
  }, [revenueTimeframe]);

  // Filter transactions data based on timeframe
  const transactionsData = useMemo(() => {
    if (transactionsTimeframe === "24h") {
      return hourlyData;
    }
    if (transactionsTimeframe === "7d") {
      return hourlyData.slice(0, 14); // Simulated week view
    }
    return hourlyData.slice(0, 8); // Simulated month view with fewer points
  }, [transactionsTimeframe]);

  // Filter creator data based on timeframe
  const creatorData = useMemo(() => {
    if (creatorTimeframe === "12m") {
      return creatorGrowth;
    }
    if (creatorTimeframe === "90d") {
      return creatorGrowth.slice(-3);
    }
    return creatorGrowth.slice(-2); // At least 2 points
  }, [creatorTimeframe]);

  return (
    <div className="flex w-full min-w-0 flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-2xl text-foreground">
          Platform Analytics
        </h2>
        <p className="text-muted-foreground text-sm">
          Comprehensive platform-wide metrics, trends, and growth analytics.
        </p>
      </div>

      {/* Hero Metrics */}
      <StatsGrid metrics={ANALYTICS_METRICS} />

      {/* GMV & Revenue Trends */}
      <Card className="min-w-0 overflow-hidden p-0">
        <ChartHeader
          actions={
            <TimeframeSelector
              onChange={setRevenueTimeframe}
              options={["30d", "90d", "12m"]}
              value={revenueTimeframe}
            />
          }
          subtitle={`GMV vs Net Revenue over ${formatTimeframeLabel(revenueTimeframe)}`}
          title="Revenue Trends"
        />
        <div className="p-5" style={{ height: 320 }}>
          <ResponsiveContainer height="100%" width="100%">
            <ComposedChart
              data={revenueData}
              margin={{ top: 5, right: 10, left: 5, bottom: 0 }}
            >
              <defs>
                <linearGradient id="gmvGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                axisLine={false}
                dataKey="month"
                fontSize={11}
                stroke="var(--gray-400)"
                tickLine={false}
              />
              <YAxis
                axisLine={false}
                domain={[0, "auto"]}
                fontSize={11}
                stroke="var(--gray-400)"
                tickFormatter={(v) => `$${(v / 1_000_000).toFixed(1)}M`}
                tickLine={false}
                width={55}
              />
              <Tooltip
                content={({ active, payload }) => (
                  <CustomTooltip
                    active={active}
                    formatter={(v, name) =>
                      name === "gmv" || name === "revenue"
                        ? `$${(v / 1000).toFixed(0)}K`
                        : v.toLocaleString()
                    }
                    payload={payload}
                  />
                )}
              />
              <Area
                dataKey="gmv"
                fill="url(#gmvGradient)"
                name="gmv"
                stroke="#8b5cf6"
                strokeWidth={2}
                type="monotone"
              />
              <Line
                dataKey="revenue"
                dot={false}
                name="revenue"
                stroke="#10b981"
                strokeWidth={2}
                type="monotone"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Two Column Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Category Distribution */}
        <Card className="overflow-hidden p-0">
          <ChartHeader
            subtitle="GMV distribution by product category"
            title="Category Performance"
          />
          <div className="flex items-center gap-6 p-5" style={{ height: 280 }}>
            <div className="relative flex-1">
              <ResponsiveContainer height={220} width="100%">
                <PieChart>
                  <Pie
                    cx="50%"
                    cy="50%"
                    data={categoryData}
                    dataKey="value"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={2}
                    strokeWidth={0}
                  >
                    {categoryData.map((entry) => (
                      <Cell fill={entry.color} key={entry.name} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!(active && payload?.length)) {
                        return null;
                      }
                      const item = payload[0]
                        .payload as (typeof categoryData)[0];
                      return (
                        <div className="rounded-lg border border-border bg-background px-3 py-2 shadow-lg">
                          <p className="font-medium text-foreground text-sm">
                            {item.name}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            GMV: ${(item.value / 1000).toFixed(0)}K
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {item.products.toLocaleString()} products
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {item.sellers} sellers
                          </p>
                        </div>
                      );
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-bold text-foreground text-lg tabular-nums">
                  9
                </span>
                <span className="text-muted-foreground text-xs">
                  Categories
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              {categoryData.slice(0, 5).map((cat) => (
                <div className="flex items-center gap-2" key={cat.name}>
                  <div
                    className="size-3 rounded-sm"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-muted-foreground text-xs">
                    {cat.name}
                  </span>
                </div>
              ))}
              <span className="text-muted-foreground/60 text-xs">+4 more</span>
            </div>
          </div>
        </Card>

        {/* Transaction Volume by Hour */}
        <Card className="min-w-0 overflow-hidden p-0">
          <ChartHeader
            actions={
              <TimeframeSelector
                onChange={setTransactionsTimeframe}
                options={["24h", "7d", "30d"]}
                value={transactionsTimeframe}
              />
            }
            subtitle={`Transaction count over the last ${transactionsTimeframe}`}
            title="Transactions"
          />
          <div className="p-5" style={{ height: 280 }}>
            <ResponsiveContainer height="100%" width="100%">
              <AreaChart
                data={transactionsData}
                margin={{ top: 5, right: 10, left: 5, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="transGradient"
                    x1="0"
                    x2="0"
                    y1="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#f97316" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  axisLine={false}
                  dataKey="hour"
                  fontSize={10}
                  interval={3}
                  stroke="var(--gray-400)"
                  tickLine={false}
                />
                <YAxis
                  axisLine={false}
                  domain={[0, "auto"]}
                  fontSize={11}
                  stroke="var(--gray-400)"
                  tickFormatter={(v) => v.toLocaleString()}
                  tickLine={false}
                  width={45}
                />
                <Tooltip
                  content={({ active, payload }) => (
                    <CustomTooltip
                      active={active}
                      formatter={(v) => v.toLocaleString()}
                      payload={payload}
                    />
                  )}
                />
                <Area
                  dataKey="transactions"
                  fill="url(#transGradient)"
                  name="transactions"
                  stroke="#f97316"
                  strokeWidth={2}
                  type="monotone"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Creator Ecosystem */}
      <Card className="min-w-0 overflow-hidden p-0">
        <ChartHeader
          actions={
            <TimeframeSelector
              onChange={setCreatorTimeframe}
              options={["30d", "90d", "12m"]}
              value={creatorTimeframe}
            />
          }
          subtitle={`Creator signups, active creators, and churn over ${creatorTimeframe === "12m" ? "12 months" : creatorTimeframe}`}
          title="Creator Ecosystem"
        />
        <div className="p-5" style={{ height: 300 }}>
          <ResponsiveContainer height="100%" width="100%">
            <ComposedChart
              data={creatorData}
              margin={{ top: 5, right: 10, left: 5, bottom: 0 }}
            >
              <XAxis
                axisLine={false}
                dataKey="month"
                fontSize={11}
                stroke="var(--gray-400)"
                tickLine={false}
              />
              <YAxis
                axisLine={false}
                domain={[0, "auto"]}
                fontSize={11}
                stroke="var(--gray-400)"
                tickFormatter={(v) => v.toLocaleString()}
                tickLine={false}
                width={50}
              />
              <Tooltip
                content={({ active, payload }) => (
                  <CustomTooltip
                    active={active}
                    formatter={(v) => v.toLocaleString()}
                    payload={payload}
                  />
                )}
              />
              <Bar
                barSize={16}
                dataKey="signups"
                fill="#10b981"
                name="signups"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                barSize={16}
                dataKey="churned"
                fill="#ef4444"
                name="churned"
                radius={[4, 4, 0, 0]}
              />
              <Line
                dataKey="active"
                dot={false}
                name="active"
                stroke="#8b5cf6"
                strokeWidth={2}
                type="monotone"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Top Performers & Marketplace Stats */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Performers */}
        <Card className="overflow-hidden p-0">
          <ChartHeader
            subtitle="Highest grossing creators this period"
            title="Top Performers"
          />
          <div className="divide-y divide-border/30">
            {adminData.topPerformers.slice(0, 5).map((performer, index) => (
              <div
                className="flex items-center justify-between px-5 py-3"
                key={performer.id}
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-6 items-center justify-center rounded-full bg-muted font-medium text-muted-foreground text-xs">
                    {index + 1}
                  </span>
                  <div className="flex size-9 items-center justify-center rounded-full bg-primary-violet font-medium text-sm text-white">
                    {performer.avatar}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-foreground text-sm">
                      {performer.name}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {performer.products} products • {performer.category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="font-semibold text-foreground text-sm tabular-nums">
                    ${(performer.gmv / 1000).toFixed(0)}K
                  </span>
                  <div
                    className={`flex items-center gap-0.5 text-xs ${performer.trend >= 0 ? "text-emerald-500" : "text-red-500"}`}
                  >
                    {performer.trend >= 0 ? (
                      <ArrowUpRight className="size-3" />
                    ) : (
                      <ArrowDownRight className="size-3" />
                    )}
                    <span className="tabular-nums">
                      {Math.abs(performer.trend)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Marketplace Liquidity Stats */}
        <Card className="overflow-hidden p-0">
          <ChartHeader
            subtitle="Key marketplace health indicators"
            title="Marketplace Stats"
          />
          <div className="grid grid-cols-2 gap-4 p-5">
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="size-4" />
                <span className="text-xs">Buyer-to-Seller Ratio</span>
              </div>
              <div className="mt-2 font-bold text-2xl text-foreground tabular-nums">
                {adminData.marketplaceLiquidity.buyerToSellerRatio}:1
              </div>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <ShoppingCart className="size-4" />
                <span className="text-xs">Avg Order Value</span>
              </div>
              <div className="mt-2 font-bold text-2xl text-foreground tabular-nums">
                ${adminData.marketplaceLiquidity.avgOrderValue}
              </div>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="size-4" />
                <span className="text-xs">Repeat Purchase Rate</span>
              </div>
              <div className="mt-2 font-bold text-2xl text-foreground tabular-nums">
                {adminData.marketplaceLiquidity.repeatPurchaseRate}%
              </div>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <BarChart3 className="size-4" />
                <span className="text-xs">Search-to-Fill Rate</span>
              </div>
              <div className="mt-2 font-bold text-2xl text-foreground tabular-nums">
                {adminData.marketplaceLiquidity.searchToFillRate}%
              </div>
            </div>
            <div className="col-span-2 rounded-lg bg-muted/50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <ShoppingCart className="size-4" />
                    <span className="text-xs">Cart Abandonment Rate</span>
                  </div>
                  <div className="mt-2 font-bold text-2xl text-amber-500 tabular-nums">
                    {adminData.marketplaceLiquidity.cartAbandonmentRate}%
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-muted-foreground text-xs">
                    Avg Time to First Sale
                  </div>
                  <div className="mt-2 font-bold text-foreground text-lg">
                    {adminData.marketplaceLiquidity.avgTimeToFirstSale}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
