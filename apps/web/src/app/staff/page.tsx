import { ArrowRight, Box, ShieldCheck, Store, Users } from "lucide-react";
import Link from "next/link";
import { StatsGrid } from "@/components/shared/stats-grid";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { fetchAuthQuery } from "@/lib/auth-server";
import { api } from "../../../convex/_generated/api";

export default async function StaffDashboardPage() {
  const overview = await fetchAuthQuery(api.platform.getStaffOverview);
  const formatPrice = (value: number | null | undefined) => {
    const parsed = typeof value === "number" ? value : Number(value);
    return Number.isFinite(parsed) ? parsed.toFixed(2) : "0.00";
  };

  const metrics = [
    {
      title: "Platform People",
      value: overview.totalUsers.toString(),
      change: `${overview.internalTeam} internal team`,
      changeType: "neutral" as const,
      icon: Users,
    },
    {
      title: "Seller-enabled",
      value: overview.sellerEnabledUsers.toString(),
      change: `${overview.activeStores} active stores`,
      changeType: "positive" as const,
      icon: Store,
    },
    {
      title: "Live Products",
      value: overview.liveProducts.toString(),
      change: `${overview.totalProducts} total catalog items`,
      changeType: "neutral" as const,
      icon: Box,
    },
    {
      title: "Internal Team",
      value: overview.internalTeam.toString(),
      change: "Staff + super admin",
      changeType: "neutral" as const,
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-2xl text-foreground">
          Staff Overview
        </h2>
        <p className="text-muted-foreground text-sm">
          Live operator visibility across people, sellers, and products.
        </p>
      </div>

      <StatsGrid metrics={metrics} />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-foreground">Recent stores</h3>
              <p className="text-muted-foreground text-sm">
                The latest storefronts and how much catalog they already carry.
              </p>
            </div>
            <Link
              className="inline-flex items-center gap-1 font-medium text-primary-violet text-sm hover:underline"
              href="/staff/sellers"
            >
              View sellers
              <ArrowRight className="size-4" />
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
                  <div className="text-right">
                    <p className="font-medium text-foreground text-sm">
                      {store.activeProducts} live
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {store.totalProducts} total
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-foreground">Recent products</h3>
              <p className="text-muted-foreground text-sm">
                Newest catalog items across the platform.
              </p>
            </div>
            <Link
              className="inline-flex items-center gap-1 font-medium text-primary-violet text-sm hover:underline"
              href="/staff/products"
            >
              View products
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {overview.recentProducts.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No products have been created yet.
              </p>
            ) : (
              overview.recentProducts.map((product) => (
                <div
                  className="flex items-center justify-between rounded-lg border border-border/40 p-3"
                  key={product._id}
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-foreground text-sm">
                      {product.name}
                    </p>
                    <p className="truncate text-muted-foreground text-xs">
                      {product.ownerName}
                      {product.storeName ? ` · ${product.storeName}` : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        product.status === "active" ? "success" : "secondary"
                      }
                    >
                      {product.status}
                    </Badge>
                    <p className="mt-2 font-medium text-foreground text-sm">
                      ${formatPrice(product.price)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-foreground">Operator lanes</h3>
            <p className="text-muted-foreground text-sm">
              Work from live-backed pages only. Unsupported mock workflows have
              been removed from the operator surface.
            </p>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <Link
            className="rounded-xl border border-border/40 p-4 transition-colors hover:bg-muted/30"
            href="/staff/users"
          >
            <p className="font-medium text-foreground">Users</p>
            <p className="mt-2 text-muted-foreground text-sm">
              Access, people visibility, and internal role updates.
            </p>
          </Link>
          <Link
            className="rounded-xl border border-border/40 p-4 transition-colors hover:bg-muted/30"
            href="/staff/sellers"
          >
            <p className="font-medium text-foreground">Sellers</p>
            <p className="mt-2 text-muted-foreground text-sm">
              Store owners, catalog volume, and seller-level oversight.
            </p>
          </Link>
          <Link
            className="rounded-xl border border-border/40 p-4 transition-colors hover:bg-muted/30"
            href="/staff/products"
          >
            <p className="font-medium text-foreground">Products</p>
            <p className="mt-2 text-muted-foreground text-sm">
              Platform catalog visibility across live, draft, and archived
              items.
            </p>
          </Link>
        </div>
      </Card>
    </div>
  );
}
