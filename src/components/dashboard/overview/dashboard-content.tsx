"use client";

import { useState } from "react";
import { CountryStats } from "@/components/dashboard/overview/country-stats";
import { RevenueChartCard } from "@/components/dashboard/overview/revenue-chart-card";
import {
  type Transaction,
  TransactionsTable,
} from "@/components/dashboard/overview/transactions-table";
import { MetricCard } from "@/components/dashboard/shared/metric-card";
import { TransactionDetail } from "@/components/dashboard/transaction-detail";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import type { DashboardData } from "@/lib/data";

interface DashboardContentProps {
  data: DashboardData;
}

export function DashboardContent({ data }: DashboardContentProps) {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data.metrics.map((item) => (
          <MetricCard key={item.title} {...item} />
        ))}
      </div>

      {/* Chart + Country Section */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <RevenueChartCard totalRevenue={data.totalRevenue} />
        <CountryStats countries={data.countries} />
      </div>

      {/* Transactions Table */}
      <TransactionsTable
        onRowClick={setSelectedTransaction}
        transactions={data.transactions as Transaction[]}
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
