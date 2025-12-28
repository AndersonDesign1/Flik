"use client";

import {
  Banknote,
  CreditCard,
  MoreHorizontal,
  Plus,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import {
  MonthlyEarningsCard,
  PaymentMethodsCard,
  TransactionDetail,
} from "@/components/dashboard/payouts";
import {
  MetricCard,
  type StatusType,
  statusConfig,
  TableToolbar,
} from "@/components/dashboard/shared";
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
import { cn } from "@/lib/utils";

const METRICS = [
  {
    title: "Available Balance",
    value: "$12,450.00",
    trend: "+18.2%",
    trendUp: true,
    subtext: "Ready for payout",
    icon: Wallet,
    primary: true,
  },
  {
    title: "Pending Payouts",
    value: "$3,200.00",
    subtext: "Scheduled tomorrow",
    icon: Banknote,
  },
  {
    title: "This Month",
    value: "$24,890.00",
    trend: "+32.5%",
    trendUp: true,
    subtext: "vs last month",
    icon: TrendingUp,
  },
  {
    title: "Total Earned",
    value: "$847,520.00",
    trend: "+24.8%",
    trendUp: true,
    subtext: "All time",
    icon: CreditCard,
  },
];

const PAYMENT_METHODS = [
  {
    name: "Bank Transfer",
    value: 425_000,
    percent: 85,
    color: "bg-blue-500",
  },
  {
    name: "PayPal",
    value: 198_340,
    percent: 55,
    color: "bg-indigo-500",
  },
  {
    name: "Stripe",
    value: 145_200,
    percent: 40,
    color: "bg-emerald-500",
  },
  {
    name: "Wise",
    value: 78_980,
    percent: 25,
    color: "bg-amber-500",
  },
];

interface Transaction {
  id: string;
  date: string;
  time: string;
  amount: string;
  method: string;
  account: string;
  status: StatusType;
}

const TRANSACTIONS: Transaction[] = [
  {
    id: "TRX-1001",
    date: "Mar 10, 2024",
    time: "3:42 PM",
    amount: "+$2,450.00",
    method: "Bank Transfer",
    account: "****4242",
    status: "Completed",
  },
  {
    id: "TRX-1002",
    date: "Mar 9, 2024",
    time: "2:15 PM",
    amount: "+$1,890.00",
    method: "PayPal",
    account: "user@email.com",
    status: "Completed",
  },
  {
    id: "TRX-1003",
    date: "Mar 8, 2024",
    time: "11:30 AM",
    amount: "+$3,200.00",
    method: "Stripe",
    account: "acct_xxx",
    status: "Pending",
  },
  {
    id: "TRX-1004",
    date: "Mar 7, 2024",
    time: "4:20 PM",
    amount: "+$950.00",
    method: "Bank Transfer",
    account: "****4242",
    status: "Completed",
  },
  {
    id: "TRX-1005",
    date: "Mar 6, 2024",
    time: "9:45 AM",
    amount: "+$1,650.00",
    method: "Wise",
    account: "****8821",
    status: "Failed",
  },
];

export function PayoutsContent() {
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
        {METRICS.map((item) => (
          <MetricCard key={item.title} {...item} />
        ))}
      </div>

      {/* Earnings Stats + Payment Methods */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <MonthlyEarningsCard />
        <PaymentMethodsCard methods={PAYMENT_METHODS} />
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
            {TRANSACTIONS.map((tx) => {
              const status = statusConfig[tx.status];
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
