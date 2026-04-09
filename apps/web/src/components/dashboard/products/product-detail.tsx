"use client";

import {
  Archive,
  DollarSign,
  ExternalLink,
  SquarePen,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import type { DashboardProduct } from "@/components/dashboard/products/columns";
import {
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface ProductDetailProps {
  product: DashboardProduct;
}

const statusConfig = {
  active: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-200",
    label: "Active",
  },
  draft: {
    bg: "bg-gray-50",
    text: "text-gray-600",
    border: "border-gray-200",
    label: "Draft",
  },
  archived: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "border-amber-200",
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
    <div className="space-y-6">
      <SheetHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <SheetTitle className="text-left">{product.name}</SheetTitle>
            <SheetDescription className="flex items-center gap-2 text-left">
              <span className="font-mono text-xs text-muted-foreground">
                /products/{product.slug}
              </span>
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
            </SheetDescription>
          </div>
          <Link
            className="inline-flex h-9 items-center gap-2 rounded-md border border-border/50 px-3 text-sm hover:bg-muted"
            href={`/dashboard/products/${product.slug}/edit`}
          >
            <SquarePen className="h-4 w-4" />
            Edit
          </Link>
        </div>
      </SheetHeader>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="mb-2 flex items-center gap-2 text-gray-500">
            <DollarSign className="h-4 w-4" />
            <span className="font-medium text-xs">Price</span>
          </div>
          <div className="font-bold text-gray-900 text-xl tabular-nums">
            {formattedPrice}
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="mb-2 flex items-center gap-2 text-gray-500">
            <Archive className="h-4 w-4" />
            <span className="font-medium text-xs">Inventory</span>
          </div>
          <div className="font-bold text-gray-900 text-xl tabular-nums">
            {product.inventory}
          </div>
        </div>
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
          <div className="mb-2 flex items-center gap-2 text-blue-600">
            <TrendingUp className="h-4 w-4" />
            <span className="font-medium text-xs">Sales</span>
          </div>
          <div className="font-bold text-blue-700 text-xl tabular-nums">
            {product.sales}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border/40 bg-muted/20 p-4 text-muted-foreground text-sm">
        Use <span className="font-medium text-foreground">Edit</span> to modify
        product details, files, cover image, and status.
      </div>

      <SheetFooter>
        <Link
          className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-3 text-primary-foreground text-sm hover:opacity-90"
          href={`/dashboard/products/${product.slug}/edit`}
        >
          <SquarePen className="h-4 w-4" />
          Open full editor
        </Link>
        {product.storeSlug ? (
          <Link
            className="inline-flex h-9 items-center gap-2 rounded-md border border-border/50 px-3 text-sm hover:bg-muted"
            href={`/products/${product.slug}`}
          >
            <ExternalLink className="h-4 w-4" />
            View storefront page
          </Link>
        ) : (
          <Link
            className="inline-flex h-9 items-center gap-2 rounded-md border border-border/50 px-3 text-muted-foreground text-sm hover:bg-muted"
            href="/account/start-selling"
          >
            <ExternalLink className="h-4 w-4" />
            Finish storefront setup
          </Link>
        )}
      </SheetFooter>
    </div>
  );
}
