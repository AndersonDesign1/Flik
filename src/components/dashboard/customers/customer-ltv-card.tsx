"use client";

import { TrendingUp } from "lucide-react";
import type { Customer } from "@/components/dashboard/customers/columns";
import { Card } from "@/components/ui/card";

interface CustomerLTVCardProps {
  totalLTV?: string;
  trend?: string;
  topCustomers: Customer[];
  maxSpent?: number;
}

export function CustomerLTVCard({
  totalLTV = "$847,520",
  trend = "+24.8%",
  topCustomers,
  maxSpent = 3200,
}: CustomerLTVCardProps) {
  const sortedCustomers = [...topCustomers]
    .sort((a, b) => b.spent - a.spent)
    .slice(0, 4);

  return (
    <Card className="lg:col-span-2">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-medium text-muted-foreground text-sm">
            Customer Lifetime Value
          </h3>
          <div className="mt-1 font-bold text-2xl text-foreground tabular-nums tracking-tight">
            {totalLTV}
          </div>
          <div className="mt-0.5 flex items-center gap-1.5">
            <span className="flex items-center gap-0.5 font-medium text-emerald-600 text-xs dark:text-emerald-400">
              <TrendingUp className="h-3 w-3" />
              {trend}
            </span>
            <span className="text-muted-foreground text-xs">
              vs last quarter
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
          Top Customers by LTV
        </h4>
        {sortedCustomers.map((customer, index) => (
          <div className="flex items-center gap-4" key={customer.id}>
            <span className="w-6 font-semibold text-muted-foreground text-sm">
              #{index + 1}
            </span>
            <div className="flex-1">
              <div className="mb-1 flex items-center justify-between">
                <span className="font-medium text-foreground text-sm">
                  {customer.name}
                </span>
                <span className="font-semibold text-foreground text-sm tabular-nums">
                  ${customer.spent.toLocaleString()}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all"
                  style={{
                    width: `${(customer.spent / maxSpent) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
