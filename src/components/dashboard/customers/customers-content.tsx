"use client";

import { Plus, TrendingUp, UserCheck, UserPlus, Users } from "lucide-react";
import { useState } from "react";
import {
  type Customer,
  CustomerDetail,
  CustomerLTVCard,
  CustomerSegmentsCard,
  columns,
} from "@/components/dashboard/customers";
import { DataTable } from "@/components/dashboard/products/data-table";
import { MetricCard, TableToolbar } from "@/components/dashboard/shared";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "CUST-001",
    name: "Alice Johnson",
    email: "alice@example.com",
    spent: 1250.0,
    lastOrder: "2024-03-10",
    status: "active",
  },
  {
    id: "CUST-002",
    name: "Bob Smith",
    email: "bob@example.com",
    spent: 450.0,
    lastOrder: "2024-03-08",
    status: "inactive",
  },
  {
    id: "CUST-003",
    name: "Charlie Davis",
    email: "charlie@example.com",
    spent: 3200.0,
    lastOrder: "2024-03-12",
    status: "active",
  },
  {
    id: "CUST-004",
    name: "Diana Evans",
    email: "diana@example.com",
    spent: 89.0,
    lastOrder: "2024-02-28",
    status: "active",
  },
  {
    id: "CUST-005",
    name: "Evan Wright",
    email: "evan@example.com",
    spent: 0.0,
    lastOrder: "-",
    status: "inactive",
  },
  {
    id: "CUST-006",
    name: "Fiona Green",
    email: "fiona@example.com",
    spent: 560.0,
    lastOrder: "2024-03-01",
    status: "active",
  },
  {
    id: "CUST-007",
    name: "George Hall",
    email: "george@example.com",
    spent: 120.0,
    lastOrder: "2024-03-05",
    status: "active",
  },
  {
    id: "CUST-008",
    name: "Hannah Lee",
    email: "hannah@example.com",
    spent: 2300.0,
    lastOrder: "2024-03-11",
    status: "active",
  },
];

const METRICS = [
  {
    title: "Total Customers",
    value: "4,972",
    trend: "+19.08%",
    trendUp: true,
    subtext: "Last 30 days",
    icon: Users,
  },
  {
    title: "Active Customers",
    value: "3,847",
    trend: "+12.5%",
    trendUp: true,
    subtext: "Last 30 days",
    icon: UserCheck,
  },
  {
    title: "New This Month",
    value: "482",
    trend: "+28.4%",
    trendUp: true,
    subtext: "vs last month",
    icon: UserPlus,
  },
  {
    title: "Avg Order Value",
    value: "$142.50",
    trend: "-3.2%",
    trendUp: false,
    subtext: "Last 30 days",
    icon: TrendingUp,
  },
];

const CUSTOMER_SEGMENTS = [
  {
    name: "VIP Customers",
    value: 892,
    percent: 75,
    color: "bg-amber-500",
  },
  {
    name: "Regular",
    value: 2145,
    percent: 60,
    color: "bg-blue-500",
  },
  {
    name: "New Customers",
    value: 1248,
    percent: 45,
    color: "bg-emerald-500",
  },
  {
    name: "Inactive",
    value: 687,
    percent: 25,
    color: "bg-gray-400",
  },
];

export function CustomersContent() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedCustomer = MOCK_CUSTOMERS.find((c) => c.id === selectedId);

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
        {METRICS.map((item) => (
          <MetricCard key={item.title} {...item} />
        ))}
      </div>

      {/* Customer Segments Section */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <CustomerLTVCard topCustomers={MOCK_CUSTOMERS} />
        <CustomerSegmentsCard segments={CUSTOMER_SEGMENTS} />
      </div>

      {/* Content - Table with Search/Filter */}
      <div className="flex-1 overflow-hidden rounded-xl border border-border/40 bg-surface-1">
        <TableToolbar title="All Customers" />

        {/* Data Table */}
        <div className="p-4">
          <DataTable
            columns={columns}
            data={MOCK_CUSTOMERS}
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
          {selectedCustomer && <CustomerDetail customer={selectedCustomer} />}
        </SheetContent>
      </Sheet>
    </div>
  );
}
