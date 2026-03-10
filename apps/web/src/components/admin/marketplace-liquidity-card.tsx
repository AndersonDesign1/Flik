"use client";

import {
  Percent,
  Search,
  ShoppingCart,
  Timer,
  TrendingUp,
  Users,
} from "lucide-react";
import { Card } from "@/components/ui/card";

interface MarketplaceLiquidity {
  buyerToSellerRatio: number;
  searchToFillRate: number;
  avgTimeToFirstSale: string;
  repeatPurchaseRate: number;
  avgOrderValue: number;
  cartAbandonmentRate: number;
}

interface MarketplaceLiquidityCardProps {
  data: MarketplaceLiquidity;
}

export function MarketplaceLiquidityCard({
  data,
}: MarketplaceLiquidityCardProps) {
  const metrics = [
    {
      icon: Users,
      label: "Buyer-to-Seller Ratio",
      value: `${data.buyerToSellerRatio}:1`,
      color: "text-blue-500",
    },
    {
      icon: Search,
      label: "Search-to-Fill Rate",
      value: `${data.searchToFillRate}%`,
      color: "text-purple-500",
    },
    {
      icon: Timer,
      label: "Avg. Time to First Sale",
      value: data.avgTimeToFirstSale,
      color: "text-amber-500",
    },
    {
      icon: TrendingUp,
      label: "Repeat Purchase Rate",
      value: `${data.repeatPurchaseRate}%`,
      color: "text-emerald-500",
    },
    {
      icon: ShoppingCart,
      label: "Avg. Order Value",
      value: `$${data.avgOrderValue.toFixed(2)}`,
      color: "text-indigo-500",
    },
    {
      icon: Percent,
      label: "Cart Abandonment",
      value: `${data.cartAbandonmentRate}%`,
      color: "text-red-500",
    },
  ];

  return (
    <Card className="overflow-hidden p-0">
      <div className="border-border/30 border-b px-5 py-4">
        <h3 className="font-semibold text-foreground text-sm">
          Marketplace Liquidity
        </h3>
        <p className="text-muted-foreground text-xs">
          Key indicators of marketplace health
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 p-5">
        {metrics.map(({ icon: Icon, label, value, color }) => (
          <div
            className="flex items-start gap-2.5 rounded-lg bg-muted/30 p-3"
            key={label}
          >
            <div className="mt-0.5">
              <Icon className={`size-4 ${color}`} />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-muted-foreground">{label}</span>
              <span className="font-semibold text-foreground text-sm tabular-nums">
                {value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
