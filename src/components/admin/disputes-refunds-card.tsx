"use client";

import { AlertTriangle, TrendingDown, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FlaggedCreator {
  id: string;
  name: string;
  refundRate: number;
  disputes: number;
  status: "under_review" | "warning_issued" | "monitoring";
  reason: string;
}

interface DisputesRefundsCardProps {
  disputeRate: number;
  refundRate: number;
  chargebackRate: number;
  totalDisputes: number;
  avgResolutionTime: string;
  disputesWon: number;
  flaggedCreators: FlaggedCreator[];
  showViewMore?: boolean;
}

const flagStatusConfig = {
  under_review: {
    bg: "bg-red-50 dark:bg-red-500/10",
    text: "text-red-600 dark:text-red-400",
  },
  warning_issued: {
    bg: "bg-amber-50 dark:bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
  },
  monitoring: {
    bg: "bg-blue-50 dark:bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
  },
};

export function DisputesRefundsCard({
  disputeRate,
  refundRate,
  chargebackRate,
  totalDisputes,
  avgResolutionTime,
  disputesWon,
  flaggedCreators,
  showViewMore = true,
}: DisputesRefundsCardProps) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="flex items-center justify-between border-border/30 border-b px-5 py-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="size-4 text-amber-500" />
          <h3 className="font-semibold text-foreground text-sm">
            Disputes & Refunds
          </h3>
        </div>
        {showViewMore && (
          <Link
            className="font-medium text-muted-foreground text-xs hover:text-foreground"
            href="/admin/disputes"
          >
            View all →
          </Link>
        )}
      </div>

      <div className="space-y-4 p-5">
        {/* Rate Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-muted/50 p-3 text-center">
            <div className="font-bold text-foreground text-lg tabular-nums">
              {disputeRate}%
            </div>
            <div className="text-[10px] text-muted-foreground">
              Dispute Rate
            </div>
          </div>
          <div className="rounded-lg bg-muted/50 p-3 text-center">
            <div className="font-bold text-foreground text-lg tabular-nums">
              {refundRate}%
            </div>
            <div className="text-[10px] text-muted-foreground">Refund Rate</div>
          </div>
          <div className="rounded-lg bg-muted/50 p-3 text-center">
            <div className="font-bold text-foreground text-lg tabular-nums">
              {chargebackRate}%
            </div>
            <div className="text-[10px] text-muted-foreground">Chargeback</div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <Users className="size-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">{totalDisputes} total</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="size-3.5 text-emerald-500" />
            <span className="text-muted-foreground">{disputesWon}% won</span>
          </div>
          <div className="text-muted-foreground">Avg: {avgResolutionTime}</div>
        </div>

        {/* Flagged Creators */}
        <div className="space-y-2">
          <span className="text-muted-foreground text-xs">
            Flagged Creators
          </span>
          <div className="space-y-2">
            {flaggedCreators.map((creator) => {
              const config = flagStatusConfig[creator.status];
              return (
                <div
                  className="flex items-center justify-between rounded-lg bg-muted/30 p-2.5"
                  key={creator.id}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-foreground text-xs">
                      {creator.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {creator.reason}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-red-500">
                      <TrendingDown className="size-3" />
                      <span className="text-[10px] tabular-nums">
                        {creator.refundRate}%
                      </span>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] capitalize",
                        config.bg,
                        config.text
                      )}
                    >
                      {creator.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
