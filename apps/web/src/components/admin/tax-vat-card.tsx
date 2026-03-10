"use client";

import { Globe } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CountryTax {
  code: string;
  name: string;
  flag: string;
  collected: number;
  remitted: number;
  pending: number;
  rate: string;
  status: "current" | "pending" | "overdue";
}

interface ComplianceAlert {
  country: string;
  message: string;
  dueDate: string;
  amount: number;
  priority: "high" | "medium" | "low";
}

interface TaxVatCardProps {
  totalCollected: number;
  totalRemitted: number;
  pendingRemittance: number;
  countries: CountryTax[];
  complianceAlerts: ComplianceAlert[];
  showViewMore?: boolean;
}

const statusColors = {
  current: "bg-emerald-500",
  pending: "bg-amber-500",
  overdue: "bg-red-500",
};

const priorityColors = {
  high: "border-red-500/50 bg-red-50 dark:bg-red-500/10",
  medium: "border-amber-500/50 bg-amber-50 dark:bg-amber-500/10",
  low: "border-blue-500/50 bg-blue-50 dark:bg-blue-500/10",
};

export function TaxVatCard({
  totalCollected,
  totalRemitted,
  pendingRemittance,
  countries,
  complianceAlerts,
  showViewMore = true,
}: TaxVatCardProps) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="flex items-center justify-between border-border/30 border-b px-5 py-4">
        <div className="flex items-center gap-2">
          <Globe className="size-4 text-muted-foreground" />
          <h3 className="font-semibold text-foreground text-sm">
            Global Tax / VAT
          </h3>
        </div>
        {showViewMore && (
          <Link
            className="font-medium text-muted-foreground text-xs hover:text-foreground"
            href="/admin/tax-compliance"
          >
            View all →
          </Link>
        )}
      </div>

      <div className="space-y-4 p-5">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="font-bold text-foreground text-sm tabular-nums">
              ${(totalCollected / 1000).toFixed(1)}K
            </div>
            <div className="text-[10px] text-muted-foreground">Collected</div>
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="font-bold text-emerald-600 text-sm tabular-nums">
              ${(totalRemitted / 1000).toFixed(1)}K
            </div>
            <div className="text-[10px] text-muted-foreground">Remitted</div>
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="font-bold text-amber-600 text-sm tabular-nums">
              ${(pendingRemittance / 1000).toFixed(1)}K
            </div>
            <div className="text-[10px] text-muted-foreground">Pending</div>
          </div>
        </div>

        {/* Compliance Alerts */}
        {complianceAlerts.length > 0 && (
          <div className="space-y-2">
            {complianceAlerts.map((alert) => (
              <div
                className={cn(
                  "rounded-lg border p-2.5",
                  priorityColors[alert.priority]
                )}
                key={alert.country}
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-foreground text-xs">
                      {alert.country}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {alert.message}
                    </span>
                  </div>
                  <span className="font-medium text-foreground text-xs tabular-nums">
                    ${alert.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Country List */}
        <div className="space-y-2">
          <span className="text-muted-foreground text-xs">By Country</span>
          <div className="max-h-[180px] space-y-1.5 overflow-y-auto">
            {countries.slice(0, 5).map((country) => (
              <div
                className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2"
                key={country.code}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{country.flag}</span>
                  <span className="text-foreground text-xs">
                    {country.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-xs tabular-nums">
                    ${(country.collected / 1000).toFixed(1)}K
                  </span>
                  <div
                    className={cn(
                      "size-2 rounded-full",
                      statusColors[country.status]
                    )}
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
