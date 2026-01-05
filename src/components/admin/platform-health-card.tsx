"use client";

import { AlertTriangle, CheckCircle2, Server, Zap } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PaymentGateway {
  name: string;
  status: "operational" | "degraded" | "down";
  latency: number;
  successRate: number;
}

interface ServerLoad {
  cpu: number;
  memory: number;
  disk: number;
  bandwidth: number;
}

interface PlatformHealthCardProps {
  apiUptime: number;
  avgResponseTime: number;
  checkoutSuccessRate: number;
  paymentGateways: PaymentGateway[];
  serverLoad: ServerLoad;
  showViewMore?: boolean;
}

const statusConfig = {
  operational: {
    icon: CheckCircle2,
    color: "text-emerald-500",
    bg: "bg-emerald-500",
  },
  degraded: {
    icon: AlertTriangle,
    color: "text-amber-500",
    bg: "bg-amber-500",
  },
  down: { icon: AlertTriangle, color: "text-red-500", bg: "bg-red-500" },
};

function getLoadColor(value: number) {
  if (value > 80) {
    return "bg-red-500";
  }
  if (value > 60) {
    return "bg-amber-500";
  }
  return "bg-emerald-500";
}

function GaugeCircle({
  value,
  label,
  color = "stroke-primary-violet",
}: {
  value: number;
  label: string;
  color?: string;
}) {
  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative size-20">
        <svg
          aria-label={`${label}: ${value}%`}
          className="size-20 -rotate-90"
          role="img"
          viewBox="0 0 80 80"
        >
          <title>
            {label}: {value}%
          </title>
          <circle
            className="stroke-muted"
            cx="40"
            cy="40"
            fill="none"
            r="36"
            strokeWidth="6"
          />
          <circle
            className={cn("transition-all duration-500", color)}
            cx="40"
            cy="40"
            fill="none"
            r="36"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            strokeWidth="6"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-bold text-foreground text-sm tabular-nums">
            {value}%
          </span>
        </div>
      </div>
      <span className="text-muted-foreground text-xs">{label}</span>
    </div>
  );
}

export function PlatformHealthCard({
  apiUptime,
  avgResponseTime,
  checkoutSuccessRate,
  paymentGateways,
  serverLoad,
  showViewMore = true,
}: PlatformHealthCardProps) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="flex items-center justify-between border-border/30 border-b px-5 py-4">
        <div className="flex items-center gap-2">
          <Server className="size-4 text-muted-foreground" />
          <h3 className="font-semibold text-foreground text-sm">
            Platform Health
          </h3>
        </div>
        {showViewMore && (
          <Link
            className="font-medium text-muted-foreground text-xs hover:text-foreground"
            href="/admin/platform-health"
          >
            View all →
          </Link>
        )}
      </div>

      <div className="space-y-5 p-5">
        {/* Gauges */}
        <div className="flex justify-around">
          <GaugeCircle
            color="stroke-emerald-500"
            label="API Uptime"
            value={apiUptime}
          />
          <GaugeCircle
            color="stroke-primary-violet"
            label="Checkout"
            value={checkoutSuccessRate}
          />
        </div>

        {/* Response Time */}
        <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
          <div className="flex items-center gap-2">
            <Zap className="size-4 text-amber-500" />
            <span className="text-muted-foreground text-xs">
              Avg Response Time
            </span>
          </div>
          <span className="font-semibold text-foreground text-sm tabular-nums">
            {avgResponseTime}ms
          </span>
        </div>

        {/* Payment Gateways */}
        <div className="space-y-2">
          <span className="text-muted-foreground text-xs">
            Payment Gateways
          </span>
          <div className="space-y-1.5">
            {paymentGateways.map((gateway) => {
              const config = statusConfig[gateway.status];
              return (
                <div
                  className="flex items-center justify-between"
                  key={gateway.name}
                >
                  <div className="flex items-center gap-2">
                    <div className={cn("size-2 rounded-full", config.bg)} />
                    <span className="text-foreground text-xs">
                      {gateway.name}
                    </span>
                  </div>
                  <span className="text-muted-foreground text-xs tabular-nums">
                    {gateway.latency}ms
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Server Load */}
        <div className="space-y-2">
          <span className="text-muted-foreground text-xs">Server Load</span>
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                ["CPU", serverLoad.cpu],
                ["Memory", serverLoad.memory],
                ["Disk", serverLoad.disk],
                ["Network", serverLoad.bandwidth],
              ] as const
            ).map(([label, value]) => (
              <div className="space-y-1" key={label}>
                <div className="flex justify-between">
                  <span className="text-[10px] text-muted-foreground">
                    {label}
                  </span>
                  <span className="text-[10px] text-foreground tabular-nums">
                    {value}%
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      getLoadColor(value)
                    )}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
