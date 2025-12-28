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

const MOCK_PRODUCTS: DashboardProduct[] = [
  {
    id: "PROD-001",
    name: "Cosmic Icon Pack",
    status: "active",
    price: 29.0,
    inventory: 450,
    sales: 120,
    image: "",
  },
  {
    id: "PROD-002",
    name: "Neo-Grid UI Kit",
    status: "active",
    price: 49.0,
    inventory: 200,
    sales: 85,
    image: "",
  },
  {
    id: "PROD-003",
    name: "Prism Wallpapers",
    status: "draft",
    price: 15.0,
    inventory: 0,
    sales: 0,
    image: "",
  },
  {
    id: "PROD-004",
    name: "Linear Icons",
    status: "active",
    price: 24.0,
    inventory: 999,
    sales: 340,
    image: "",
  },
  {
    id: "PROD-005",
    name: "Glassmorphism 3D Assets",
    status: "archived",
    price: 59.0,
    inventory: 12,
    sales: 45,
    image: "",
  },
  {
    id: "PROD-006",
    name: "Dark Mode Templates",
    status: "active",
    price: 39.0,
    inventory: 150,
    sales: 67,
    image: "",
  },
  {
    id: "PROD-007",
    name: "Abstract Shapes Bundle",
    status: "active",
    price: 19.0,
    inventory: 300,
    sales: 23,
    image: "",
  },
  {
    id: "PROD-008",
    name: "Tech-Noir Fonts",
    status: "draft",
    price: 35.0,
    inventory: 0,
    sales: 0,
    image: "",
  },
  {
    id: "PROD-009",
    name: "Cyberpunk HUD Elements",
    status: "active",
    price: 45.0,
    inventory: 60,
    sales: 110,
    image: "",
  },
  {
    id: "PROD-010",
    name: "Minimalist Mockups",
    status: "active",
    price: 25.0,
    inventory: 500,
    sales: 89,
    image: "",
  },
];

export function ProductsContent() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProduct = MOCK_PRODUCTS.find((p) => p.id === selectedId);

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
          data={MOCK_PRODUCTS}
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
