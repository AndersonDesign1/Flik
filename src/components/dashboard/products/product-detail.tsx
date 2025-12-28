"use client";

import { Archive, DollarSign, Save, Trash2, TrendingUp } from "lucide-react";
import type { DashboardProduct } from "@/components/dashboard/products/columns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ProductDetailProps {
  product: DashboardProduct;
}

const statusConfig = {
  active: {
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-500/20",
    label: "Active",
  },
  draft: {
    bg: "bg-gray-50 dark:bg-gray-500/10",
    text: "text-gray-600 dark:text-gray-400",
    border: "border-gray-200 dark:border-gray-500/20",
    label: "Draft",
  },
  archived: {
    bg: "bg-amber-50 dark:bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-500/20",
    label: "Archived",
  },
};

export function ProductDetail({ product }: ProductDetailProps) {
  const status = statusConfig[product.status];
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Header */}
      <div className="flex-shrink-0 border-border/40 border-b pb-6">
        <h2 className="truncate font-semibold text-foreground text-lg tracking-tight">
          {product.name}
        </h2>
        <div className="mt-1 flex items-center gap-2">
          <p className="font-mono text-muted-foreground text-sm">
            {product.id}
          </p>
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

      {/* Scrollable Content */}
      <div className="flex-1 space-y-6 overflow-y-auto py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border/40 bg-card p-4">
            <div className="mb-2 flex items-center gap-2 text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span className="font-medium text-xs">Price</span>
            </div>
            <div className="font-bold text-xl tabular-nums">
              {formattedPrice}
            </div>
          </div>
          <div className="rounded-xl border border-border/40 bg-card p-4">
            <div className="mb-2 flex items-center gap-2 text-muted-foreground">
              <Archive className="h-4 w-4" />
              <span className="font-medium text-xs">Inventory</span>
            </div>
            <div className="font-bold text-xl tabular-nums">
              {product.inventory}
            </div>
          </div>
        </div>

        {/* Sales Card */}
        <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50/50 p-4 dark:border-blue-500/10 dark:from-blue-500/5 dark:to-indigo-500/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <TrendingUp className="h-4 w-4" />
              <span className="font-medium text-sm">Total Sales</span>
            </div>
            <span className="font-bold text-2xl text-blue-700 tabular-nums dark:text-blue-300">
              {product.sales}
            </span>
          </div>
        </div>

        {/* Edit Form */}
        <div className="space-y-4">
          <h3 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
            Edit Product
          </h3>

          <div className="space-y-4 rounded-xl border border-border/40 bg-card p-4">
            <div className="space-y-2">
              <Label className="text-sm" htmlFor="name">
                Product Name
              </Label>
              <Input className="h-10" defaultValue={product.name} id="name" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm" htmlFor="price">
                  Price ($)
                </Label>
                <Input
                  className="h-10"
                  defaultValue={product.price}
                  id="price"
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm" htmlFor="inventory">
                  Inventory
                </Label>
                <Input
                  className="h-10"
                  defaultValue={product.inventory}
                  id="inventory"
                  type="number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm" htmlFor="description">
                Description
              </Label>
              <Textarea
                className="min-h-[100px] resize-none"
                defaultValue="A premium digital asset for modern designers."
                id="description"
                placeholder="Product description..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-shrink-0 gap-3 border-border/40 border-t pt-6">
        <Button className="flex-1 gap-2" size="lg" variant="outline">
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
        <Button className="flex-1 gap-2" size="lg">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
