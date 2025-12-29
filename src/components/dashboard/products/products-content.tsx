"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  columns,
  type DashboardProduct,
} from "@/components/dashboard/products/columns";
import { DataTable } from "@/components/dashboard/products/data-table";
import { ProductDetail } from "@/components/dashboard/products/product-detail";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface ProductsContentProps {
  products: DashboardProduct[];
}

export function ProductsContent({ products }: ProductsContentProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProduct = products.find((p) => p.id === selectedId);

  return (
    <div className="flex h-full flex-1 flex-col space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-foreground text-lg">Products</h2>
          <p className="hidden text-muted-foreground text-sm sm:block">
            Manage your product catalog.
          </p>
        </div>
        <Button asChild className="h-9 gap-2" size="sm">
          <Link
            className="inline-flex items-center gap-2"
            href="/dashboard/products/new"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Product</span>
            <span className="sm:hidden">Add</span>
          </Link>
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden pt-1 pl-1">
        <DataTable
          columns={columns}
          data={products}
          onRowClick={(row) => setSelectedId(row.id)}
          selectedId={selectedId || undefined}
        />
      </div>

      <Sheet
        onOpenChange={(open) => !open && setSelectedId(null)}
        open={!!selectedId}
      >
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          {selectedProduct && <ProductDetail product={selectedProduct} />}
        </SheetContent>
      </Sheet>
    </div>
  );
}
