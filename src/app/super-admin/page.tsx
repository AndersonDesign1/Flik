import { ShieldCheck, Store, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { StatsGrid } from "@/components/shared/stats-grid";
import { Card } from "@/components/ui/card";
import { fetchAuthQuery } from "@/lib/auth-server";
import { api } from "../../../convex/_generated/api";

export default async function SuperAdminPage() {
  const [overview, sellers] = await Promise.all([
    fetchAuthQuery(api.platform.getSuperAdminOverview),
    fetchAuthQuery(api.platform.listSellerPerformance),
  ]);

  const metrics = [
    {
      title: "Platform Users",
      value: overview.totalUsers.toString(),
      change: `${overview.buyers} buyers`,
      changeType: "neutral" as const,
      icon: Users,
    },
    {
      title: "Internal Team",
      value: (
        overview.superAdmins +
        overview.admins +
        overview.staff
      ).toString(),
      change: `${overview.superAdmins} super admin`,
      changeType: "neutral" as const,
      icon: ShieldCheck,
    },
    {
      title: "Active Stores",
      value: overview.activeStores.toString(),
      change: `${overview.sellers} seller accounts`,
      changeType: "positive" as const,
      icon: Store,
    },
    {
      title: "Products Listed",
      value: overview.products.toString(),
      change: "Marketplace-wide inventory",
      changeType: "neutral" as const,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-2xl text-foreground">
          Governance Overview
        </h2>
        <p className="text-muted-foreground text-sm">
          Manage internal access and track platform-wide seller activation.
        </p>
      </div>

      <StatsGrid metrics={metrics} />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Recent Stores</h3>
            <Link
              className="font-medium text-primary-violet text-sm hover:underline"
              href="/super-admin/sellers"
            >
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {overview.recentStores.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No stores have been created yet.
              </p>
            ) : (
              overview.recentStores.map((store) => (
                <div
                  className="flex items-center justify-between rounded-lg border border-border/40 p-3"
                  key={store.slug}
                >
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {store.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {store.ownerName}
                    </p>
                  </div>
                  <span className="text-muted-foreground text-xs">
                    /store/{store.slug}
                  </span>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Seller Snapshot</h3>
            <Link
              className="font-medium text-primary-violet text-sm hover:underline"
              href="/super-admin/admins"
            >
              View team
            </Link>
          </div>
          <div className="space-y-3">
            {sellers.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                Seller performance will appear after stores are created.
              </p>
            ) : (
              sellers.slice(0, 5).map((seller) => (
                <div
                  className="flex items-center justify-between rounded-lg border border-border/40 p-3"
                  key={seller.slug}
                >
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {seller.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {seller.ownerName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground text-sm">
                      {seller.activeProducts} live
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {seller.totalProducts} total
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
