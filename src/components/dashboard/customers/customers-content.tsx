"use client";

import type { LucideIcon } from "lucide-react";
import { Plus, TrendingUp, UserCheck, UserPlus, Users } from "lucide-react";
import { useState } from "react";
import {
  type Customer,
  columns,
} from "@/components/dashboard/customers/columns";
import { CustomerDetail } from "@/components/dashboard/customers/customer-detail";
import { CustomerLTVCard } from "@/components/dashboard/customers/customer-ltv-card";
import { CustomerSegmentsCard } from "@/components/dashboard/customers/customer-segments-card";
import { DataTable } from "@/components/dashboard/products/data-table";
import { MetricCard } from "@/components/dashboard/shared/metric-card";
import { TableToolbar } from "@/components/dashboard/shared/table-toolbar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import type { CustomersData } from "@/lib/data";

// Icon map for server-sent icon names
const iconMap: Record<string, LucideIcon> = {
  Users,
  UserCheck,
  UserPlus,
  TrendingUp,
};

interface CustomersContentProps {
  data: CustomersData;
}

export function CustomersContent({ data }: CustomersContentProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedCustomer = data.customers.find((c) => c.id === selectedId);

  return (
    <div className="flex h-full flex-1 flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-foreground text-lg">Customers</h2>
          <p className="text-muted-foreground text-sm">
            View and manage your customer base.
          </p>
        </div>
        <Button className="h-9 gap-2" size="sm">
          <Plus className="h-4 w-4" />
          Add Customer
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data.metrics.map((item) => (
          <MetricCard
            icon={iconMap[item.icon]}
            key={item.title}
            subtext={item.subtext}
            title={item.title}
            trend={item.trend}
            trendUp={item.trendUp}
            value={item.value}
          />
        ))}
      </div>

      {/* Customer Segments Section */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <CustomerLTVCard topCustomers={data.customers as Customer[]} />
        <CustomerSegmentsCard segments={data.segments} />
      </div>

      {/* Content - Table with Search/Filter */}
      <div className="flex-1 overflow-hidden rounded-xl border border-border/40 bg-surface-1">
        <TableToolbar title="All Customers" />

        {/* Data Table */}
        <div className="p-4">
          <DataTable
            columns={columns}
            data={data.customers as Customer[]}
            onRowClick={(row) => setSelectedId(row.id)}
            selectedId={selectedId || undefined}
          />
        </div>
      </div>

      {/* Sheet for Customer Detail */}
      <Sheet
        onOpenChange={(open) => !open && setSelectedId(null)}
        open={!!selectedId}
      >
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          {selectedCustomer && (
            <CustomerDetail customer={selectedCustomer as Customer} />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
