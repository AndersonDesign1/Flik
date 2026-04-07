import {
  ChevronRight,
  ShieldCheck,
  Store,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { StatsGrid } from "@/components/shared/stats-grid";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { fetchAuthQuery } from "@/lib/auth-server";
import type { Role } from "@/lib/roles";
import { api } from "../../../convex/_generated/api";

function getInternalBadgeVariant(role: Role) {
  if (role === "super_admin") {
    return "default";
  }

  if (role === "user") {
    return "secondary";
  }

  return "accent";
}

export default async function SuperAdminPage() {
  const [overview, sellers, internalRoster] = await Promise.all([
    fetchAuthQuery(api.platform.getSuperAdminOverview),
    fetchAuthQuery(api.platform.listSellerPerformance),
    fetchAuthQuery(api.platform.listAdminRoster),
  ]);

  const internalTeam = internalRoster.slice(0, 4);
  const totalInternal = overview.superAdmins + overview.staff;
  const userMix = [
    {
      label: "Buyers",
      value: overview.buyers,
      tone: "secondary" as const,
    },
    {
      label: "Seller-enabled",
      value: overview.sellers,
      tone: "success" as const,
    },
    {
      label: "Internal team",
      value: totalInternal,
      tone: "warning" as const,
    },
  ];

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
      value: (overview.superAdmins + overview.staff).toString(),
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

  const recentSellers = sellers.slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-2xl text-foreground">
          Governance Overview
        </h2>
        <p className="text-muted-foreground text-sm">
          Watch the whole platform, keep tabs on the internal team, and step in
          only when governance needs an owner decision.
        </p>
      </div>

      <StatsGrid metrics={metrics} />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-foreground">Platform mix</h3>
              <p className="text-muted-foreground text-sm">
                High-level visibility across buyers, seller-enabled accounts,
                and the internal team.
              </p>
            </div>
            <Link
              className="inline-flex items-center gap-1 font-medium text-primary-violet text-sm hover:underline"
              href="/super-admin/admins"
            >
              Internal roster
              <ChevronRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {userMix.map((segment) => (
              <div
                className="rounded-xl border border-border/40 bg-muted/20 p-4"
                key={segment.label}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-foreground text-sm">
                    {segment.label}
                  </p>
                  <Badge variant={segment.tone}>{segment.value}</Badge>
                </div>
                <p className="mt-4 font-semibold text-3xl text-foreground">
                  {segment.value}
                </p>
                <p className="mt-2 text-muted-foreground text-xs">
                  {overview.totalUsers === 0
                    ? "No account data yet"
                    : `${Math.round((segment.value / overview.totalUsers) * 100)}% of platform accounts`}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-foreground">Internal team</h3>
              <p className="text-muted-foreground text-sm">
                Preview the latest internal access assignments without leaving
                the governance dashboard.
              </p>
            </div>
            <Link
              className="inline-flex items-center gap-1 font-medium text-primary-violet text-sm hover:underline"
              href="/super-admin/admins"
            >
              Manage access
              <ChevronRight className="size-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {internalTeam.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No staff or super admins assigned yet.
              </p>
            ) : (
              internalTeam.map((member) => (
                <div
                  className="flex items-center justify-between rounded-lg border border-border/40 p-3"
                  key={`${member.email}-${member.role}`}
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-foreground text-sm">
                      {member.name}
                    </p>
                    <p className="truncate text-muted-foreground text-xs">
                      {member.email}
                    </p>
                  </div>
                  <Badge variant={getInternalBadgeVariant(member.role)}>
                    {member.role.replace("_", " ")}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

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
              href="/super-admin/sellers"
            >
              View sellers
            </Link>
          </div>
          <div className="space-y-3">
            {sellers.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                Seller performance will appear after stores are created.
              </p>
            ) : (
              recentSellers.map((seller) => (
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
                    <div className="mt-2">
                      <Badge
                        variant={
                          seller.userType === "both" ? "accent" : "secondary"
                        }
                      >
                        {seller.userType === "both"
                          ? "Buyer + Seller"
                          : "Seller only"}
                      </Badge>
                    </div>
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
