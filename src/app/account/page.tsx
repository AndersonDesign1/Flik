import { Download, Heart, ShoppingBag } from "lucide-react";
import { StatsGrid } from "@/components/shared/stats-grid";
import { Card } from "@/components/ui/card";

const USER_METRICS = [
  {
    title: "Total Purchases",
    value: "12",
    change: "3 this month",
    changeType: "neutral" as const,
    icon: ShoppingBag,
  },
  {
    title: "Library Items",
    value: "28",
    change: "All accessible",
    changeType: "positive" as const,
    icon: Download,
  },
  {
    title: "Wishlist",
    value: "5",
    change: "2 on sale",
    changeType: "positive" as const,
    icon: Heart,
  },
];

const RECENT_PURCHASES = [
  {
    id: "ORD-001",
    name: "Cosmic Icon Pack",
    seller: "Design Studio Co",
    price: "$29.00",
    date: "Dec 25, 2024",
  },
  {
    id: "ORD-002",
    name: "Neo-Grid UI Kit",
    seller: "Creative Assets",
    price: "$49.00",
    date: "Dec 20, 2024",
  },
  {
    id: "ORD-003",
    name: "Linear Icons",
    seller: "Icon Foundry",
    price: "$24.00",
    date: "Dec 15, 2024",
  },
];

export default function AccountDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-semibold text-2xl text-gray-900">
          Welcome back, John! 👋
        </h2>
        <p className="text-gray-500 text-sm">
          Here's what's happening with your account.
        </p>
      </div>

      {/* Stats */}
      <StatsGrid metrics={USER_METRICS} />

      {/* Recent Purchases */}
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Recent Purchases</h3>
          <a
            className="font-medium text-gray-500 text-sm hover:text-gray-700"
            href="/account/purchases"
          >
            View all →
          </a>
        </div>
        <div className="space-y-3">
          {RECENT_PURCHASES.map((purchase) => (
            <div
              className="flex items-center justify-between rounded-lg border border-gray-100 p-4"
              key={purchase.id}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                  <span className="text-xl">📦</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    {purchase.name}
                  </p>
                  <p className="text-gray-500 text-xs">
                    by {purchase.seller} • {purchase.date}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900 text-sm">
                  {purchase.price}
                </p>
                <a
                  className="font-medium text-blue-600 text-xs hover:text-blue-700"
                  href={`/account/library/${purchase.id}`}
                >
                  Download →
                </a>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
