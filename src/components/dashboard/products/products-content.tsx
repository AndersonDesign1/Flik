"use client";

import { Plus } from "lucide-react";
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
    <div className="flex h-full flex-1 flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-foreground text-lg">Products</h2>
          <p className="text-muted-foreground text-sm">
            Manage your product catalog.
          </p>
        </div>
        <Button className="h-9 gap-2" size="sm">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
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
