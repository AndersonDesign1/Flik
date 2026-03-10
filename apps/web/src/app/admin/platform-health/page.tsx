import { Activity, CheckCircle, Server, Zap } from "lucide-react";
import { PlatformHealthCard } from "@/components/admin/platform-health-card";
import { StatsGrid } from "@/components/shared/stats-grid";
import adminData from "@/data/admin-dashboard.json";

const serverLoad = adminData.platformHealth.serverLoad as {
  cpu: number;
  memory: number;
  disk: number;
  bandwidth: number;
};

const HEALTH_METRICS = [
  {
    title: "API Uptime",
    value: `${adminData.platformHealth.apiUptime}%`,
    change: "Last 30 days",
    changeType: "positive" as const,
    icon: Activity,
  },
  {
    title: "Avg Response Time",
    value: `${adminData.platformHealth.avgResponseTime}ms`,
    change: "Target: <200ms",
    changeType: "positive" as const,
    icon: Zap,
  },
  {
    title: "Checkout Success",
    value: `${adminData.platformHealth.checkoutSuccessRate}%`,
    change: "Above 98% target",
    changeType: "positive" as const,
    icon: CheckCircle,
  },
  {
    title: "Server Load (CPU)",
    value: `${serverLoad.cpu}%`,
    change: "Healthy range",
    changeType: "positive" as const,
    icon: Server,
  },
];

export default function PlatformHealthPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-2xl text-foreground">
          Platform Health
        </h2>
        <p className="text-muted-foreground text-sm">
          Monitor API performance, payment gateways, and system health metrics.
        </p>
      </div>

      <StatsGrid metrics={HEALTH_METRICS} />

      <PlatformHealthCard
        apiUptime={adminData.platformHealth.apiUptime}
        avgResponseTime={adminData.platformHealth.avgResponseTime}
        checkoutSuccessRate={adminData.platformHealth.checkoutSuccessRate}
        paymentGateways={
          adminData.platformHealth.paymentGateways as Array<{
            name: string;
            status: "operational" | "degraded" | "down";
            latency: number;
            successRate: number;
          }>
        }
        serverLoad={adminData.platformHealth.serverLoad}
        showViewMore={false}
      />
    </div>
  );
}
