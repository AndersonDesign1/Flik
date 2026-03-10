"use client";

import { ArrowUpRight, Crown, TrendingDown, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TopPerformer {
  id: string;
  name: string;
  avatar: string;
  products: number;
  gmv: number;
  revenue: number;
  trend: number;
  sales: number;
  category: string;
}

interface TopPerformersCardProps {
  performers: TopPerformer[];
}

const RANK_COLORS = ["bg-amber-500", "bg-slate-400", "bg-amber-700"];

function getRankColor(index: number) {
  return RANK_COLORS[index] ?? "bg-primary-violet";
}

function PerformerRow({
  performer,
  index,
}: {
  performer: TopPerformer;
  index: number;
}) {
  const isTopThree = index < 3;
  const trendPositive = performer.trend >= 0;

  return (
    <div className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-muted/50">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div
            className={cn(
              "flex size-9 items-center justify-center rounded-full font-medium text-sm text-white",
              getRankColor(index)
            )}
          >
            {performer.avatar}
          </div>
          {isTopThree && (
            <div
              className={cn(
                "absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full font-bold text-[10px] text-white",
                getRankColor(index)
              )}
            >
              {index + 1}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="font-medium text-foreground text-sm">
            {performer.name}
          </p>
          <p className="text-[10px] text-muted-foreground">
            {performer.products} products • {performer.category}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-0.5">
        <p className="font-semibold text-foreground text-sm tabular-nums">
          ${(performer.gmv / 1000).toFixed(1)}K
        </p>
        <div
          className={cn(
            "flex items-center gap-0.5 text-[10px]",
            trendPositive ? "text-emerald-500" : "text-red-500"
          )}
        >
          {trendPositive ? (
            <TrendingUp className="size-3" />
          ) : (
            <TrendingDown className="size-3" />
          )}
          <span className="tabular-nums">
            {trendPositive ? "+" : ""}
            {performer.trend}%
          </span>
        </div>
      </div>
    </div>
  );
}

export function TopPerformersCard({ performers }: TopPerformersCardProps) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="flex items-center justify-between border-border/30 border-b px-5 py-4">
        <div className="flex items-center gap-2">
          <Crown className="size-4 text-amber-500" />
          <h3 className="font-semibold text-foreground text-sm">
            Top Performers
          </h3>
        </div>
        <Link
          className="flex items-center gap-1 font-medium text-muted-foreground text-xs hover:text-foreground"
          href="/admin/sellers"
        >
          View all
          <ArrowUpRight className="size-3" />
        </Link>
      </div>

      <div className="divide-y divide-border/30">
        {performers.slice(0, 5).map((performer, index) => (
          <PerformerRow
            index={index}
            key={performer.id}
            performer={performer}
          />
        ))}
      </div>
    </Card>
  );
}
