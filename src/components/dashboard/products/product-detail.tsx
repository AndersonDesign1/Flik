"use client";

import type { DashboardProduct } from "@/components/dashboard/products/columns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProductDetailProps {
  product: DashboardProduct;
}

export function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <h3 className="font-bold text-xl">{product.name}</h3>
          <Badge variant={product.status === "active" ? "default" : "outline"}>
            {product.status}
          </Badge>
        </div>
        <p className="text-mono text-muted-foreground text-sm">{product.id}</p>
      </div>

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Product Name</Label>
          <Input defaultValue={product.name} id="name" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input defaultValue={product.price} id="price" type="number" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="inventory">Inventory</Label>
            <Input
              defaultValue={product.inventory}
              id="inventory"
              type="number"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            className="h-32"
            defaultValue="A premium digital asset for modern designers."
            id="description"
            placeholder="Product description..."
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
