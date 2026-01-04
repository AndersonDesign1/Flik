import { Box, CreditCard, DollarSign, Store, Users } from "lucide-react";
import Link from "next/link";
import { StatsGrid } from "@/components/shared/stats-grid";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const ADMIN_METRICS = [
  {
    title: "Total Revenue",
    value: "$1.2M",
    change: "+18.2% from last month",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Active Sellers",
    value: "2,456",
    change: "+124 this month",
    changeType: "positive" as const,
    icon: Store,
  },
  {
    title: "Total Products",
    value: "48,392",
    change: "+1,234 this month",
    changeType: "positive" as const,
    icon: Box,
  },
  {
    title: "Total Users",
    value: "156,789",
    change: "+8,432 this month",
    changeType: "positive" as const,
    icon: Users,
  },
];

const RECENT_SELLERS = [
  {
    name: "Design Studio Co",
    products: 45,
    revenue: "$12,450",
    status: "active",
  },
  {
    name: "Creative Assets",
    products: 23,
    revenue: "$8,920",
    status: "active",
  },
  { name: "UI Kit Pro", products: 67, revenue: "$34,100", status: "pending" },
  { name: "Template Hub", products: 12, revenue: "$3,200", status: "active" },
  { name: "Icon Foundry", products: 89, revenue: "$45,600", status: "active" },
];

const PENDING_PAYOUTS = [
  { seller: "Design Studio Co", amount: "$2,450", date: "Dec 28" },
  { seller: "Creative Assets", amount: "$1,890", date: "Dec 28" },
  { seller: "UI Kit Pro", amount: "$5,670", date: "Dec 29" },
  { seller: "Template Hub", amount: "$890", date: "Dec 29" },
  { seller: "Icon Foundry", amount: "$3,450", date: "Dec 30" },
];

const sellerStatusConfig = {
  active: {
    bg: "bg-accent-teal-50 dark:bg-accent-teal/10",
    text: "text-accent-teal-700 dark:text-accent-teal",
    border: "border-accent-teal-200 dark:border-accent-teal/20",
  },
  pending: {
    bg: "bg-amber-50 dark:bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-500/20",
  },
  suspended: {
    bg: "bg-error-red-50 dark:bg-error-red/10",
    text: "text-error-red dark:text-error-red",
    border: "border-error-red-100 dark:border-error-red/20",
  },
} as const;

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-2xl text-foreground">
          Platform Overview
        </h2>
        <p className="text-muted-foreground text-sm">
          Monitor platform-wide metrics and activity.
        </p>
      </div>

      <StatsGrid metrics={ADMIN_METRICS} />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="overflow-hidden p-0">
          <div className="flex items-center justify-between border-border/30 border-b px-5 py-4">
            <h3 className="font-semibold text-foreground text-sm">
              Recent Sellers
            </h3>
            <Link
              className="font-medium text-muted-foreground text-sm hover:text-foreground"
              href="/admin/sellers"
            >
              View all →
            </Link>
          </div>
          <div className="divide-y divide-border/30">
            {RECENT_SELLERS.map((seller) => {
              const status =
                sellerStatusConfig[
                  seller.status as keyof typeof sellerStatusConfig
                ];
              return (
                <div
                  className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-muted/50"
                  key={seller.name}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-primary-violet font-medium text-sm text-white">
                      {seller.name.charAt(0)}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="font-medium text-foreground text-sm">
                        {seller.name}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {seller.products} products
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <p className="font-semibold text-foreground text-sm tabular-nums">
                      {seller.revenue}
                    </p>
                    <span
                      className={cn(
                        "font-medium text-xs capitalize",
                        status.text
                      )}
                    >
                      {seller.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="overflow-hidden p-0">
          <div className="flex items-center justify-between border-border/30 border-b px-5 py-4">
            <h3 className="font-semibold text-foreground text-sm">
              Pending Payouts
            </h3>
            <Link
              className="font-medium text-muted-foreground text-sm hover:text-foreground"
              href="/admin/payouts"
            >
              View all →
            </Link>
          </div>
          <div className="divide-y divide-border/30">
            {PENDING_PAYOUTS.map((payout) => (
              <div
                className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-muted/50"
                key={payout.seller}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="size-5 text-muted-foreground" />
                  <div className="flex flex-col gap-0.5">
                    <p className="font-medium text-foreground text-sm">
                      {payout.seller}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Due {payout.date}
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-foreground text-sm tabular-nums">
                  {payout.amount}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
