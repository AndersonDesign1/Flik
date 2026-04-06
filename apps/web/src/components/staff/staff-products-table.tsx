"use client";

import { Box, CheckCircle, Clock3, Search, XCircle } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { StatsGrid } from "@/components/shared/stats-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface StaffProductRecord {
  _id: string;
  createdAt: number;
  name: string;
  ownerEmail: string;
  ownerName: string;
  price: number;
  sales: number;
  status: "draft" | "active" | "archived";
  storeName?: string;
  storeSlug?: string;
}

interface StaffProductsTableProps {
  products: StaffProductRecord[];
}

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getStatusBadgeVariant(status: StaffProductRecord["status"]) {
  if (status === "active") {
    return "success";
  }

  if (status === "draft") {
    return "secondary";
  }

  return "outline";
}

export function StaffProductsTable({ products }: StaffProductsTableProps) {
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState<"all" | "draft" | "active" | "archived">(
    "all"
  );

  const filteredProducts = useMemo(() => {
    const query = searchValue.toLowerCase();
    return products.filter((product) => {
      const matchesFilter = filter === "all" || product.status === filter;
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.ownerName.toLowerCase().includes(query) ||
        product.ownerEmail.toLowerCase().includes(query) ||
        (product.storeName?.toLowerCase().includes(query) ?? false);

      return matchesFilter && matchesSearch;
    });
  }, [filter, products, searchValue]);

  const metrics = [
    {
      title: "Total Products",
      value: products.length.toString(),
      change: "Catalog items",
      changeType: "neutral" as const,
      icon: Box,
    },
    {
      title: "Live Products",
      value: products
        .filter((product) => product.status === "active")
        .length.toString(),
      change: "Published on platform",
      changeType: "positive" as const,
      icon: CheckCircle,
    },
    {
      title: "Draft Products",
      value: products
        .filter((product) => product.status === "draft")
        .length.toString(),
      change: "Not yet published",
      changeType: "neutral" as const,
      icon: Clock3,
    },
    {
      title: "Archived Products",
      value: products
        .filter((product) => product.status === "archived")
        .length.toString(),
      change: "No longer active",
      changeType: "negative" as const,
      icon: XCircle,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-2xl text-foreground">Products</h2>
        <p className="text-muted-foreground text-sm">
          Live catalog oversight for draft, active, and archived products.
        </p>
      </div>

      <StatsGrid metrics={metrics} />

      <Card className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Search className="size-4 text-muted-foreground" />
            <Input
              className="h-10"
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search by product, seller, email, or store..."
              value={searchValue}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {(["all", "draft", "active", "archived"] as const).map((status) => (
              <Button
                className="capitalize"
                key={status}
                onClick={() => setFilter(status)}
                size="sm"
                variant={filter === status ? "default" : "outline"}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-border/20 hover:bg-transparent">
              <TableHead className="px-6 text-xs">Product</TableHead>
              <TableHead className="text-xs">Seller</TableHead>
              <TableHead className="text-xs">Store</TableHead>
              <TableHead className="text-xs">Status</TableHead>
              <TableHead className="text-xs">Price</TableHead>
              <TableHead className="text-xs">Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell
                  className="px-6 py-10 text-center text-muted-foreground"
                  colSpan={6}
                >
                  No products match the current filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow
                  className="border-border/20 hover:bg-muted/30"
                  key={product._id}
                >
                  <TableCell className="px-6 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-foreground text-sm">
                        {product.name}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {product.sales.toLocaleString()} sales
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-foreground text-sm">
                        {product.ownerName}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {product.ownerEmail}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    {product.storeSlug ? (
                      <Link
                        className="font-medium text-primary-violet text-sm hover:underline"
                        href={`/store/${product.storeSlug}`}
                        target="_blank"
                      >
                        {product.storeName ?? product.storeSlug}
                      </Link>
                    ) : (
                      <span className="text-muted-foreground text-sm">
                        No store
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge variant={getStatusBadgeVariant(product.status)}>
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4 font-medium text-foreground text-sm">
                    ${product.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="py-4 text-muted-foreground text-sm">
                    {formatDate(product.createdAt)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
