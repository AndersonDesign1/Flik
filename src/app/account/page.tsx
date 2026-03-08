import { Download, Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { StatsGrid } from "@/components/shared/stats-grid";
import { Card } from "@/components/ui/card";
import { fetchAuthQuery } from "@/lib/auth-server";
import { api } from "../../../convex/_generated/api";

export default async function AccountDashboardPage() {
  const [user, profile] = await Promise.all([
    fetchAuthQuery(api.users.getCurrentUser),
    fetchAuthQuery(api.profiles.getProfile),
  ]);

  const profileDisplayName = [profile?.firstName, profile?.lastName]
    .filter((part): part is string => Boolean(part))
    .join(" ");
  const emailUsername = user?.email ? user.email.split("@")[0] : undefined;
  const displayName =
    profileDisplayName || user?.name || emailUsername || "there";

  const userMetrics = [
    {
      title: "Total Purchases",
      value: "0",
      change: "Connected to live account",
      changeType: "neutral" as const,
      icon: ShoppingBag,
    },
    {
      title: "Library Items",
      value: "0",
      change: "Synced from your account",
      changeType: "neutral" as const,
      icon: Download,
    },
    {
      title: "Wishlist",
      value: "0",
      change: "Synced from your account",
      changeType: "neutral" as const,
      icon: Heart,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold text-2xl text-foreground">
          Welcome back, {displayName}! 👋
        </h2>
        <p className="text-muted-foreground text-sm">
          Your dashboard is now connected to your account profile.
        </p>
      </div>

      <StatsGrid metrics={userMetrics} />

      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Recent Purchases</h3>
          <Link
            className="font-medium text-muted-foreground text-sm hover:text-foreground"
            href="/account/purchases"
          >
            View all →
          </Link>
        </div>

        <div className="rounded-lg border border-border border-dashed p-6 text-center">
          <p className="font-medium text-foreground text-sm">
            No purchases yet
          </p>
          <p className="mt-1 text-muted-foreground text-xs">
            Once you buy products, they&apos;ll appear here automatically.
          </p>
          <Link
            className="mt-4 inline-flex font-medium text-primary-violet text-xs hover:underline"
            href="/account/discover"
          >
            Discover products
          </Link>
        </div>
      </Card>
    </div>
  );
}
