import { Box, CreditCard, DollarSign, Store, Users } from "lucide-react";
import { StatsGrid } from "@/components/shared/stats-grid";
import { Card } from "@/components/ui/card";

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

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-semibold text-2xl text-gray-900">
          Platform Overview
        </h2>
        <p className="text-gray-500 text-sm">
          Monitor platform-wide metrics and activity.
        </p>
      </div>

      {/* Stats */}
      <StatsGrid metrics={ADMIN_METRICS} />

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Sellers */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Recent Sellers</h3>
            <a
              className="font-medium text-gray-500 text-sm hover:text-gray-700"
              href="/admin/sellers"
            >
              View all →
            </a>
          </div>
          <div className="space-y-3">
            {RECENT_SELLERS.map((seller) => (
              <div
                className="flex items-center justify-between rounded-lg border border-gray-100 p-3"
                key={seller.name}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 font-medium text-gray-600 text-sm">
                    {seller.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {seller.name}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {seller.products} products
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 text-sm">
                    {seller.revenue}
                  </p>
                  <span
                    className={`text-xs ${
                      seller.status === "active"
                        ? "text-emerald-600"
                        : "text-amber-600"
                    }`}
                  >
                    {seller.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending Payouts */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Pending Payouts</h3>
            <a
              className="font-medium text-gray-500 text-sm hover:text-gray-700"
              href="/admin/payouts"
            >
              View all →
            </a>
          </div>
          <div className="space-y-3">
            {[
              { seller: "Design Studio Co", amount: "$2,450", date: "Dec 28" },
              { seller: "Creative Assets", amount: "$1,890", date: "Dec 28" },
              { seller: "UI Kit Pro", amount: "$5,670", date: "Dec 29" },
              { seller: "Template Hub", amount: "$890", date: "Dec 29" },
              { seller: "Icon Foundry", amount: "$3,450", date: "Dec 30" },
            ].map((payout) => (
              <div
                className="flex items-center justify-between rounded-lg border border-gray-100 p-3"
                key={payout.seller}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {payout.seller}
                    </p>
                    <p className="text-gray-500 text-xs">Due {payout.date}</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-900 text-sm">
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
