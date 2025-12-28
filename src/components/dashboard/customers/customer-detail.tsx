"use client";

import { Calendar, DollarSign, Mail, Package } from "lucide-react";
import type { Customer } from "@/components/dashboard/customers/columns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface CustomerDetailProps {
  customer: Customer;
}

const statusConfig = {
  active: {
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-500/20",
    label: "Active",
  },
  inactive: {
    bg: "bg-gray-50 dark:bg-gray-500/10",
    text: "text-gray-600 dark:text-gray-400",
    border: "border-gray-200 dark:border-gray-500/20",
    label: "Inactive",
  },
};

export function CustomerDetail({ customer }: CustomerDetailProps) {
  const status = statusConfig[customer.status];
  const formattedSpent = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(customer.spent);

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Header */}
      <div className="flex-shrink-0 border-border/40 border-b pb-6">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={customer.image} />
            <AvatarFallback className="font-medium text-sm">
              {customer.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h2 className="truncate font-semibold text-foreground text-lg tracking-tight">
              {customer.name}
            </h2>
            <div className="mt-0.5 flex items-center gap-2">
              <p className="text-muted-foreground text-sm">{customer.email}</p>
              <span
                className={cn(
                  "inline-flex items-center rounded-full border px-2 py-0.5 font-medium text-xs capitalize",
                  status.bg,
                  status.text,
                  status.border
                )}
              >
                {status.label}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 space-y-6 overflow-y-auto py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border/40 bg-card p-4">
            <div className="mb-2 flex items-center gap-2 text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span className="font-medium text-xs">Lifetime Value</span>
            </div>
            <div className="font-bold text-xl tabular-nums">
              {formattedSpent}
            </div>
          </div>
          <div className="rounded-xl border border-border/40 bg-card p-4">
            <div className="mb-2 flex items-center gap-2 text-muted-foreground">
              <Package className="h-4 w-4" />
              <span className="font-medium text-xs">Last Order</span>
            </div>
            <div className="font-bold text-xl tabular-nums">
              {customer.lastOrder}
            </div>
          </div>
        </div>

        {/* Customer Info Card */}
        <div className="space-y-3">
          <h3 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
            Customer Details
          </h3>
          <div className="divide-y divide-border/40 rounded-xl border border-border/40 bg-card">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="text-sm">Email</span>
              </div>
              <span className="font-medium text-foreground text-sm">
                {customer.email}
              </span>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Customer Since</span>
              </div>
              <span className="font-medium text-foreground text-sm">
                Jan 2024
              </span>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <Package className="h-4 w-4" />
                <span className="text-sm">Total Orders</span>
              </div>
              <span className="font-medium text-foreground text-sm">
                {Math.floor(customer.spent / 50) || 1}
              </span>
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="space-y-3">
          <h3 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
            Private Notes
          </h3>
          <div className="space-y-4 rounded-xl border border-border/40 bg-card p-4">
            <div className="space-y-2">
              <Label className="text-sm" htmlFor="notes">
                Notes
              </Label>
              <Textarea
                className="min-h-[100px] resize-none"
                id="notes"
                placeholder="Add notes about this customer..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-shrink-0 gap-3 border-border/40 border-t pt-6">
        <Button className="flex-1 gap-2" size="lg" variant="outline">
          Archive
        </Button>
        <Button className="flex-1 gap-2" size="lg">
          Save Notes
        </Button>
      </div>
    </div>
  );
}
