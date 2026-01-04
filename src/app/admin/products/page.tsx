"use client";

import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { TableToolbar } from "@/components/shared/table-toolbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const PRODUCTS = [
  {
    id: "1",
    name: "Cosmic Icon Pack",
    seller: "Design Studio Co",
    price: "$29.00",
    sales: 120,
    status: "active",
    image: "",
  },
  {
    id: "2",
    name: "Neo-Grid UI Kit",
    seller: "Creative Assets",
    price: "$49.00",
    sales: 85,
    status: "active",
    image: "",
  },
  {
    id: "3",
    name: "Prism Wallpapers",
    seller: "UI Kit Pro",
    price: "$15.00",
    sales: 45,
    status: "pending",
    image: "",
  },
  {
    id: "4",
    name: "Linear Icons",
    seller: "Icon Foundry",
    price: "$24.00",
    sales: 340,
    status: "active",
    image: "",
  },
  {
    id: "5",
    name: "Glassmorphism Assets",
    seller: "Template Hub",
    price: "$59.00",
    sales: 67,
    status: "rejected",
    image: "",
  },
];

const productStatusConfig = {
  active: {
    bg: "bg-accent-teal-50 dark:bg-accent-teal/10",
    text: "text-accent-teal-700 dark:text-accent-teal",
    border: "border-accent-teal-200 dark:border-accent-teal/20",
  },
  pending: {
    bg: "bg-amber-50 dark:bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-500/20",
  },
  rejected: {
    bg: "bg-error-red-50 dark:bg-error-red/10",
    text: "text-error-red dark:text-error-red",
    border: "border-error-red-100 dark:border-error-red/20",
  },
} as const;

export default function AdminProductsPage() {
  const [filter, setFilter] = useState("all");
  const [searchValue, setSearchValue] = useState("");

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesFilter = filter === "all" || p.status === filter;
    const matchesSearch =
      p.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      p.seller.toLowerCase().includes(searchValue.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-2xl text-foreground">Products</h2>
        <p className="text-muted-foreground text-sm">
          Moderate and manage all products.
        </p>
      </div>

      <div className="flex items-center gap-2">
        {["all", "pending", "active", "rejected"].map((status) => (
          <Button
            className="h-8 capitalize"
            key={status}
            onClick={() => setFilter(status)}
            size="sm"
            variant={filter === status ? "default" : "outline"}
          >
            {status}
          </Button>
        ))}
      </div>

      <Card className="overflow-hidden p-0">
        <TableToolbar
          onSearchChange={setSearchValue}
          searchPlaceholder="Search products..."
          searchValue={searchValue}
          title="All Products"
        />

        <Table>
          <TableHeader>
            <TableRow className="border-border/30 hover:bg-transparent">
              <TableHead className="h-11 font-medium text-xs">
                Product
              </TableHead>
              <TableHead className="h-11 font-medium text-xs">Seller</TableHead>
              <TableHead className="h-11 text-right font-medium text-xs">
                Price
              </TableHead>
              <TableHead className="h-11 text-right font-medium text-xs">
                Sales
              </TableHead>
              <TableHead className="h-11 font-medium text-xs">Status</TableHead>
              <TableHead className="h-11 w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => {
              const status =
                productStatusConfig[
                  product.status as keyof typeof productStatusConfig
                ];
              return (
                <TableRow
                  className="border-border/20 transition-colors hover:bg-muted/50"
                  key={product.id}
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative size-10 overflow-hidden rounded-lg border border-border bg-muted">
                        {product.image ? (
                          <Image
                            alt={product.name}
                            className="object-cover"
                            fill
                            src={product.image}
                          />
                        ) : (
                          <div className="flex size-full items-center justify-center text-muted-foreground text-xs">
                            IMG
                          </div>
                        )}
                      </div>
                      <p className="font-medium text-foreground text-sm">
                        {product.name}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-muted-foreground">
                    {product.seller}
                  </TableCell>
                  <TableCell className="py-4 text-right font-semibold tabular-nums">
                    {product.price}
                  </TableCell>
                  <TableCell className="py-4 text-right text-muted-foreground tabular-nums">
                    {product.sales}
                  </TableCell>
                  <TableCell className="py-4">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border px-2.5 py-1 font-medium text-xs capitalize",
                        status.bg,
                        status.text,
                        status.border
                      )}
                    >
                      {product.status}
                    </span>
                  </TableCell>
                  <TableCell className="py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="size-8" size="icon" variant="ghost">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View product</DropdownMenuItem>
                        <DropdownMenuItem>Approve</DropdownMenuItem>
                        <DropdownMenuItem className="text-error-red">
                          Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
