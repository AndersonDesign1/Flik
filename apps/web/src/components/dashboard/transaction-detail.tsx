import {
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  Download,
  Package,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: string;
  payment: string;
  date: string;
  time: string;
}

interface TransactionDetailProps {
  transaction: Transaction;
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
  const status =
    statusConfig[transaction.status as keyof typeof statusConfig] ||
    statusConfig.Pending;

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Header */}
      <div className="flex-shrink-0 border-border/40 border-b pb-6">
        <h2 className="font-semibold text-foreground text-lg tracking-tight">
          Transaction Details
        </h2>
        <div className="mt-1 flex items-center gap-2">
          <p className="text-muted-foreground text-sm">
            Order ID:{" "}
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

      {/* Scrollable Content */}
      <div className="flex-1 space-y-6 overflow-y-auto py-6">
        {/* Amount Card */}
        <div className="rounded-xl border border-border/40 bg-gradient-to-br from-gray-50 to-gray-100/50 p-5 dark:from-gray-800/50 dark:to-gray-900/30">
          <span className="font-medium text-muted-foreground text-sm">
            Total Amount
          </span>
          <div className="mt-2 font-bold text-3xl text-foreground tabular-nums tracking-tight">
            {transaction.amount}
          </div>
        </div>

        {/* Customer Section */}
        <div className="space-y-3">
          <h3 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
            Customer
          </h3>
          <div className="rounded-xl border border-border/40 bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-semibold text-sm text-white">
                {transaction.customer
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="min-w-0">
                <div className="truncate font-medium text-foreground">
                  {transaction.customer}
                </div>
                <div className="text-muted-foreground text-xs">Customer</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Section */}
        <div className="space-y-3">
          <h3 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
            Product
          </h3>
          <div className="rounded-xl border border-border/40 bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted">
                <Package className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <div className="truncate font-medium text-foreground">
                  {transaction.product}
                </div>
                <div className="text-muted-foreground text-xs">Single Item</div>
              </div>
            </div>
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
                {transaction.payment}
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
      </div>

      {/* Footer Actions */}
      <div className="flex-shrink-0 space-y-3 border-border/40 border-t pt-6">
        <Button className="w-full gap-2" size="lg">
          <Download className="h-4 w-4" />
          Download Invoice
        </Button>
        <Button className="w-full gap-2" size="lg" variant="outline">
          Refund Transaction
        </Button>
      </div>
    </div>
  );
}
