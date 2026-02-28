"use client";

import {
  AlertCircle,
  ArrowDownToLine,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PayoutTransaction {
  id: string;
  date: string;
  time: string;
  amount: string;
  method: string;
  account: string;
  status: string;
  referenceId?: string;
}

interface TransactionDetailProps {
  transaction: PayoutTransaction;
}

const statusConfig = {
  Completed: {
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-500/20",
    icon: CheckCircle2,
  },
  Failed: {
    bg: "bg-red-50 dark:bg-red-500/10",
    text: "text-red-600 dark:text-red-400",
    border: "border-red-200 dark:border-red-500/20",
    icon: XCircle,
  },
  Pending: {
    bg: "bg-amber-50 dark:bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-500/20",
    icon: Clock,
  },
};

export function TransactionDetail({ transaction }: TransactionDetailProps) {
  const statusKey = transaction.status as keyof typeof statusConfig;
  const status = statusConfig[statusKey] ?? statusConfig.Pending;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex-shrink-0 border-border/40 border-b pb-6">
        <h2 className="font-semibold text-foreground text-lg tracking-tight">
          Payout Details
        </h2>
        <div className="mt-1 flex items-center gap-2">
          <p className="text-muted-foreground text-sm">
            Transaction ID:{" "}
            <span className="font-mono text-foreground">{transaction.id}</span>
          </p>
          <span
            className={cn(
              "inline-flex items-center rounded-full border px-2 py-0.5 font-medium text-xs",
              status.bg,
              status.text,
              status.border
            )}
          >
            {transaction.status}
          </span>
        </div>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto py-6">
        <div className="rounded-xl border border-border/40 bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-5 dark:from-emerald-500/5 dark:to-emerald-500/10">
          <span className="font-medium text-emerald-600 text-sm dark:text-emerald-400">
            Payout Amount
          </span>
          <div className="mt-2 font-bold text-3xl text-emerald-700 tabular-nums tracking-tight dark:text-emerald-300">
            {transaction.amount}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
            Payment Details
          </h3>
          <div className="divide-y divide-border/40 rounded-xl border border-border/40 bg-card">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                <span className="text-sm">Method</span>
              </div>
              <span className="font-medium text-foreground text-sm">
                {transaction.method}
              </span>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                <span className="text-sm">Account</span>
              </div>
              <span className="font-medium font-mono text-foreground text-sm">
                {transaction.account}
              </span>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Date</span>
              </div>
              <span className="font-medium text-foreground text-sm">
                {transaction.date}
              </span>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Time</span>
              </div>
              <span className="font-medium text-foreground text-sm">
                {transaction.time}
              </span>
            </div>
          </div>
        </div>

        {transaction.referenceId ? (
          <div className="space-y-3">
            <h3 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
              Reference
            </h3>
            <div className="rounded-xl border border-border/40 bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  Reference ID
                </span>
                <span className="font-mono text-foreground text-sm">
                  {transaction.referenceId}
                </span>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex-shrink-0 space-y-3 border-border/40 border-t pt-6">
        <Button className="w-full gap-2" size="lg">
          <ArrowDownToLine className="h-4 w-4" />
          Download Receipt
        </Button>
        <Button className="w-full gap-2" size="lg" variant="outline">
          <AlertCircle className="h-4 w-4" />
          Report an Issue
        </Button>
      </div>
    </div>
  );
}
