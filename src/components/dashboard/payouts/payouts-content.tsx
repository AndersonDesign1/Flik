"use client";

import type { LucideIcon } from "lucide-react";
import {
  Banknote,
  CreditCard,
  MoreHorizontal,
  Plus,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { MonthlyEarningsCard } from "@/components/dashboard/payouts/monthly-earnings-card";
import { PaymentMethodsCard } from "@/components/dashboard/payouts/payment-methods-card";
import { TransactionDetail } from "@/components/dashboard/payouts/transaction-detail";
import { MetricCard } from "@/components/dashboard/shared/metric-card";
import {
  type StatusType,
  statusConfig,
} from "@/components/dashboard/shared/status-config";
import { TableToolbar } from "@/components/dashboard/shared/table-toolbar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PayoutsData } from "@/lib/data";
import { cn } from "@/lib/utils";

// Icon map for server-sent icon names
const iconMap: Record<string, LucideIcon> = {
  Wallet,
  Banknote,
  TrendingUp,
  CreditCard,
};

interface PayoutsContentProps {
  data: PayoutsData;
}

export function PayoutsContent({ data }: PayoutsContentProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="flex h-full flex-1 flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-foreground text-lg">Payouts</h2>
          <p className="text-muted-foreground text-sm">
            Manage your earnings and payouts.
          </p>
        </div>
        <Button className="h-9 gap-2" size="sm">
          <Plus className="h-4 w-4" />
          Request Payout
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data.metrics.map((item) => (
          <MetricCard
            icon={iconMap[item.icon]}
            key={item.title}
            primary={item.primary}
            subtext={item.subtext}
            title={item.title}
            trend={item.trend}
            trendUp={item.trendUp}
            value={item.value}
          />
        ))}
      </div>

      {/* Earnings Stats + Payment Methods */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <MonthlyEarningsCard />
        <PaymentMethodsCard methods={data.paymentMethods} />
      </div>

      {/* Transactions Table */}
      <div className="flex-1 overflow-hidden rounded-xl border border-border/40 bg-surface-1">
        <TableToolbar title="Transaction History" />

        <Table>
          <TableHeader>
            <TableRow className="border-border/30 hover:bg-transparent">
              <TableHead className="h-11 font-medium text-xs">ID</TableHead>
              <TableHead className="h-11 font-medium text-xs">Method</TableHead>
              <TableHead className="h-11 font-medium text-xs">
                Account
              </TableHead>
              <TableHead className="h-11 text-right font-medium text-xs">
                Amount
              </TableHead>
              <TableHead className="h-11 font-medium text-xs">Status</TableHead>
              <TableHead className="h-11 font-medium text-xs">Date</TableHead>
              <TableHead className="h-11 text-right font-medium text-xs">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.transactions.map((tx) => {
              const status = statusConfig[tx.status as StatusType];
              return (
                <TableRow
                  className="cursor-pointer border-border/20 transition-colors hover:bg-muted/50"
                  key={tx.id}
                  onClick={() => setSelectedId(tx.id)}
                >
                  <TableCell className="py-4 font-medium">{tx.id}</TableCell>
                  <TableCell className="py-4">{tx.method}</TableCell>
                  <TableCell className="py-4 font-mono text-muted-foreground text-xs">
                    {tx.account}
                  </TableCell>
                  <TableCell className="py-4 text-right font-semibold text-emerald-600 tabular-nums dark:text-emerald-400">
                    {tx.amount}
                  </TableCell>
                  <TableCell className="py-4">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border px-2.5 py-1 font-medium text-xs",
                        status.bg,
                        status.text,
                        status.border
                      )}
                    >
                      {tx.status}
                    </span>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="text-foreground">{tx.date}</span>
                    <span className="ml-1.5 text-muted-foreground text-xs">
                      {tx.time}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          onClick={(e) => e.stopPropagation()}
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedId(tx.id);
                          }}
                        >
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          Download receipt
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Sheet for Transaction Detail */}
      <Sheet
        onOpenChange={(open) => !open && setSelectedId(null)}
        open={!!selectedId}
      >
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          {selectedId && <TransactionDetail id={selectedId} />}
        </SheetContent>
      </Sheet>
    </div>
  );
}
