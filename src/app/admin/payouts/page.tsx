"use client";

import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  CreditCard,
  MoreHorizontal,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { PayoutStatusChart } from "@/components/admin/charts/payout-status-chart";
import { StatsGrid } from "@/components/shared/stats-grid";
import { TableToolbar } from "@/components/shared/table-toolbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import adminData from "@/data/admin-dashboard.json";
import { cn } from "@/lib/utils";

const payoutSummary = adminData.payoutQueue.summary;
const recentPayouts = adminData.payoutQueue.recentPayouts as Array<{
  id: string;
  seller: string;
  amount: number;
  status: "pending" | "processing" | "completed" | "failed";
  initiatedAt: string;
  method: string;
  bankLast4?: string;
  paypalEmail?: string;
  failureReason?: string;
}>;

const PAYOUT_METRICS = [
  {
    title: "Total Pending",
    value: `$${(payoutSummary.pending.amount / 1000).toFixed(0)}K`,
    change: `${payoutSummary.pending.count} payouts`,
    changeType: "neutral" as const,
    icon: Clock,
  },
  {
    title: "Processing",
    value: `$${(payoutSummary.processing.amount / 1000).toFixed(0)}K`,
    change: `${payoutSummary.processing.count} payouts`,
    changeType: "neutral" as const,
    icon: ArrowUpRight,
  },
  {
    title: "Completed (30d)",
    value: `$${(payoutSummary.completed.amount / 1000).toFixed(0)}K`,
    change: `${payoutSummary.completed.count} payouts`,
    changeType: "positive" as const,
    icon: CheckCircle2,
  },
  {
    title: "Failed",
    value: `$${(payoutSummary.failed.amount / 1000).toFixed(0)}K`,
    change: `${payoutSummary.failed.count} payouts`,
    changeType: "negative" as const,
    icon: XCircle,
  },
];

const statusConfig = {
  pending: {
    icon: Clock,
    bg: "bg-amber-50 dark:bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-500/20",
  },
  processing: {
    icon: ArrowUpRight,
    bg: "bg-blue-50 dark:bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-500/20",
  },
  completed: {
    icon: CheckCircle2,
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-500/20",
  },
  failed: {
    icon: XCircle,
    bg: "bg-red-50 dark:bg-red-500/10",
    text: "text-red-600 dark:text-red-400",
    border: "border-red-200 dark:border-red-500/20",
  },
} as const;

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function PayoutsPage() {
  const [filter, setFilter] = useState("all");
  const [searchValue, setSearchValue] = useState("");

  const filteredPayouts = recentPayouts.filter((p) => {
    const matchesFilter = filter === "all" || p.status === filter;
    const matchesSearch = p.seller
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-2xl text-foreground">Payouts</h2>
        <p className="text-muted-foreground text-sm">
          Manage creator payouts, track processing status, and resolve failed
          transfers.
        </p>
      </div>

      <StatsGrid metrics={PAYOUT_METRICS} />

      {/* Payout Chart and Failed Payouts Summary */}
      <div className="grid gap-6 lg:grid-cols-2">
        <PayoutStatusChart data={payoutSummary} showViewMore={false} />

        {/* Failed Payouts Card */}
        <Card className="overflow-hidden p-0">
          <div className="flex items-center justify-between border-border/30 border-b px-5 py-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="size-4 text-red-500" />
              <h3 className="font-semibold text-foreground text-sm">
                Failed Payouts
              </h3>
            </div>
            <span className="rounded-full bg-red-100 px-2 py-0.5 font-medium text-red-600 text-xs dark:bg-red-500/10 dark:text-red-400">
              {adminData.payoutQueue.failedPayouts.length} require attention
            </span>
          </div>
          <div className="space-y-3 p-5">
            {adminData.payoutQueue.failedPayouts.map((payout) => (
              <div
                className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-500/20 dark:bg-red-500/10"
                key={payout.id}
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-foreground text-sm">
                      {payout.seller}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {payout.failureReason}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="font-semibold text-foreground text-sm tabular-nums">
                      ${payout.amount.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {payout.attempts} attempts
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex items-center gap-2">
        {["all", "pending", "processing", "completed", "failed"].map(
          (status) => (
            <Button
              className="h-8 capitalize"
              key={status}
              onClick={() => setFilter(status)}
              size="sm"
              variant={filter === status ? "default" : "outline"}
            >
              {status}
            </Button>
          )
        )}
      </div>

      {/* Recent Payouts Table */}
      <Card className="overflow-hidden p-0">
        <TableToolbar
          onSearchChange={setSearchValue}
          searchPlaceholder="Search sellers..."
          searchValue={searchValue}
          title="Recent Payouts"
        />

        <Table>
          <TableHeader>
            <TableRow className="border-border/30 hover:bg-transparent">
              <TableHead className="h-11 font-medium text-xs">Seller</TableHead>
              <TableHead className="h-11 text-right font-medium text-xs">
                Amount
              </TableHead>
              <TableHead className="h-11 font-medium text-xs">Method</TableHead>
              <TableHead className="h-11 font-medium text-xs">Status</TableHead>
              <TableHead className="h-11 font-medium text-xs">
                Initiated
              </TableHead>
              <TableHead className="h-11 w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayouts.map((payout) => {
              const config = statusConfig[payout.status];
              const StatusIcon = config.icon;
              return (
                <TableRow
                  className="border-border/20 transition-colors hover:bg-muted/50"
                  key={payout.id}
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-full bg-primary-violet font-medium text-sm text-white">
                        {payout.seller.charAt(0)}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <p className="font-medium text-foreground text-sm">
                          {payout.seller}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {payout.bankLast4
                            ? `****${payout.bankLast4}`
                            : payout.paypalEmail || ""}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-right font-semibold tabular-nums">
                    ${payout.amount.toLocaleString()}
                  </TableCell>
                  <TableCell className="py-4 text-muted-foreground capitalize">
                    <div className="flex items-center gap-1.5">
                      <CreditCard className="size-3.5" />
                      {payout.method.replace("_", " ")}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 font-medium text-xs capitalize",
                        config.bg,
                        config.text,
                        config.border
                      )}
                    >
                      <StatusIcon className="size-3" />
                      {payout.status}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 text-muted-foreground text-sm">
                    {formatDate(payout.initiatedAt)}
                  </TableCell>
                  <TableCell className="py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="size-8" size="icon" variant="ghost">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        {payout.status === "failed" && (
                          <DropdownMenuItem>Retry payout</DropdownMenuItem>
                        )}
                        {payout.status === "pending" && (
                          <DropdownMenuItem className="text-error-red">
                            Cancel payout
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
