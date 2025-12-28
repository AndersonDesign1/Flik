"use client";

import { useState } from "react";
import {
  CountryStats,
  RevenueChartCard,
  type Transaction,
  TransactionsTable,
} from "@/components/dashboard/overview";
import { MetricCard } from "@/components/dashboard/shared";
import { TransactionDetail } from "@/components/dashboard/transaction-detail";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const METRICS = [
  {
    title: "Total Profit",
    value: "$30,720",
    trend: "+12.04%",
    trendUp: true,
    subtext: "Last 30 days",
  },
  {
    title: "Total Orders",
    value: "15,350",
    trend: "+16.02%",
    trendUp: true,
    subtext: "Last 30 days",
  },
  {
    title: "New Customers",
    value: "4,972",
    trend: "+19.08%",
    trendUp: true,
    subtext: "Last 30 days",
  },
  {
    title: "Conversion Rate",
    value: "5.18%",
    trend: "+10.02%",
    trendUp: true,
    subtext: "Last 30 days",
  },
];

const COUNTRIES = [
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    value: 12_628,
    percent: 80,
    color: "bg-blue-500",
  },
  {
    name: "United States",
    flag: "🇺🇸",
    value: 10_628,
    percent: 80,
    color: "bg-indigo-500",
  },
  {
    name: "Sweden",
    flag: "🇸🇪",
    value: 8628,
    percent: 60,
    color: "bg-emerald-500",
  },
  { name: "Turkey", flag: "🇹🇷", value: 6628, percent: 40, color: "bg-red-500" },
];

const TRANSACTIONS: Transaction[] = [
  {
    id: "#893427",
    customer: "Alex Morgan",
    product: "Jacket",
    amount: "$49.20",
    status: "Completed",
    payment: "Apple Pay",
    date: "Nov 12, 2025",
    time: "3:42 PM",
  },
  {
    id: "#A74329",
    customer: "Megan Rapin",
    product: "Watch",
    amount: "$150.75",
    status: "Failed",
    payment: "PayPal",
    date: "Nov 13, 2025",
    time: "4:20 PM",
  },
  {
    id: "#B8652C",
    customer: "Kristie Mewis",
    product: "Sunglass",
    amount: "$120.62",
    status: "Completed",
    payment: "Bank Transfer",
    date: "Nov 14, 2025",
    time: "5:42 PM",
  },
  {
    id: "#C8872F",
    customer: "Rose Lavelle",
    product: "Cap",
    amount: "$200.45",
    status: "Pending",
    payment: "Stripe",
    date: "Nov 15, 2025",
    time: "5:54 PM",
  },
];

export function DashboardContent() {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {METRICS.map((item) => (
          <MetricCard key={item.title} {...item} />
        ))}
      </div>

      {/* Chart + Country Section */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <RevenueChartCard totalRevenue="$72,592" />
        <CountryStats countries={COUNTRIES} />
      </div>

      {/* Transactions Table */}
      <TransactionsTable
        onRowClick={setSelectedTransaction}
        transactions={TRANSACTIONS}
      />

      <Sheet
        onOpenChange={(open) => !open && setSelectedTransaction(null)}
        open={!!selectedTransaction}
      >
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          {selectedTransaction && (
            <TransactionDetail transaction={selectedTransaction} />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
