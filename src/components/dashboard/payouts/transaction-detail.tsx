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

interface TransactionDetailProps {
  id: string;
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

export function TransactionDetail({ id }: TransactionDetailProps) {
  // Mock data derivation based on ID
  const amount = "$2,450.00";
  const date = "March 10, 2024";
  const time = "3:42 PM";
  const statusKey = "Completed" as keyof typeof statusConfig;
  const status = statusConfig[statusKey];
  const _StatusIcon = status.icon;

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Header */}
      <div className="flex-shrink-0 border-border/40 border-b pb-6">
        <h2 className="font-semibold text-foreground text-lg tracking-tight">
          Payout Details
        </h2>
        <div className="mt-1 flex items-center gap-2">
          <p className="text-muted-foreground text-sm">
            Transaction ID:{" "}
            <span className="font-mono text-foreground">{id}</span>
          </p>
          <span
            className={cn(
              "inline-flex items-center rounded-full border px-2 py-0.5 font-medium text-xs",
              status.bg,
              status.text,
              status.border
            )}
          >
            {statusKey}
          </span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 space-y-6 overflow-y-auto py-6">
        {/* Amount Card */}
        <div className="rounded-xl border border-border/40 bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-5 dark:from-emerald-500/5 dark:to-emerald-500/10">
          <span className="font-medium text-emerald-600 text-sm dark:text-emerald-400">
            Payout Amount
          </span>
          <div className="mt-2 font-bold text-3xl text-emerald-700 tabular-nums tracking-tight dark:text-emerald-300">
            {amount}
          </div>
        </div>

        {/* Payment Details */}
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
                Bank Transfer
              </span>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                <span className="text-sm">Account</span>
              </div>
              <span className="font-medium font-mono text-foreground text-sm">
                **** 4242
              </span>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Date</span>
              </div>
              <span className="font-medium text-foreground text-sm">
                {date}
              </span>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Time</span>
              </div>
              <span className="font-medium text-foreground text-sm">
                {time}
              </span>
            </div>
          </div>
        </div>

        {/* Reference Section */}
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
                PAY-883920
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
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
