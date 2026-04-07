"use client";

import { DollarSign, Search, Store, UserCheck } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { StatsGrid } from "@/components/shared/stats-grid";
import { Badge } from "@/components/ui/badge";
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

interface StaffSellerRecord {
  activeProducts: number;
  createdAt: number;
  name: string;
  ownerEmail: string;
  ownerName: string;
  slug: string;
  status: "draft" | "active";
  totalProducts: number;
  totalSales: number;
  userType?: "buyer" | "seller" | "both";
}

interface StaffSellersTableProps {
  sellers: StaffSellerRecord[];
}

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function StaffSellersTable({ sellers }: StaffSellersTableProps) {
  const [searchValue, setSearchValue] = useState("");

  const filteredSellers = useMemo(() => {
    const query = searchValue.toLowerCase();
    return sellers.filter((seller) => {
      if (!query) {
        return true;
      }

      return (
        seller.name.toLowerCase().includes(query) ||
        seller.ownerName.toLowerCase().includes(query) ||
        seller.ownerEmail.toLowerCase().includes(query) ||
        seller.slug.toLowerCase().includes(query)
      );
    });
  }, [searchValue, sellers]);

  const metrics = [
    {
      title: "Total Stores",
      value: sellers.length.toString(),
      change: "Seller workspaces",
      changeType: "neutral" as const,
      icon: Store,
    },
    {
      title: "Active Stores",
      value: sellers
        .filter((seller) => seller.status === "active")
        .length.toString(),
      change: "Live storefronts",
      changeType: "positive" as const,
      icon: UserCheck,
    },
    {
      title: "Live Products",
      value: sellers
        .reduce((total, seller) => total + seller.activeProducts, 0)
        .toString(),
      change: "Published catalog items",
      changeType: "neutral" as const,
      icon: Store,
    },
    {
      title: "Recorded Sales",
      value: sellers
        .reduce((total, seller) => total + seller.totalSales, 0)
        .toLocaleString(),
      change: "Product sales field total",
      changeType: "positive" as const,
      icon: DollarSign,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-2xl text-foreground">Sellers</h2>
        <p className="text-muted-foreground text-sm">
          Live seller and storefront visibility across the marketplace.
        </p>
      </div>

      <StatsGrid metrics={metrics} />

      <Card className="p-6">
        <div className="flex items-center gap-2">
          <Search className="size-4 text-muted-foreground" />
          <Input
            className="h-10"
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search by store, owner, email, or slug..."
            value={searchValue}
          />
        </div>
      </Card>

      <Card className="overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-border/20 hover:bg-transparent">
              <TableHead className="px-6 text-xs">Store</TableHead>
              <TableHead className="text-xs">Owner</TableHead>
              <TableHead className="text-xs">Catalog</TableHead>
              <TableHead className="text-xs">Status</TableHead>
              <TableHead className="text-xs">Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSellers.length === 0 ? (
              <TableRow>
                <TableCell
                  className="px-6 py-10 text-center text-muted-foreground"
                  colSpan={5}
                >
                  No sellers match the current search.
                </TableCell>
              </TableRow>
            ) : (
              filteredSellers.map((seller) => (
                <TableRow
                  className="border-border/20 hover:bg-muted/30"
                  key={seller.slug}
                >
                  <TableCell className="px-6 py-4">
                    <div className="flex flex-col gap-0.5">
                      <Link
                        className="font-medium text-foreground text-sm hover:text-primary-violet"
                        href={`/store/${seller.slug}`}
                        target="_blank"
                      >
                        {seller.name}
                      </Link>
                      <span className="text-muted-foreground text-xs">
                        /store/{seller.slug}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-foreground text-sm">
                        {seller.ownerName}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {seller.ownerEmail}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-foreground text-sm">
                        {seller.activeProducts} live
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {seller.totalProducts} total products
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge
                      variant={
                        seller.status === "active" ? "success" : "secondary"
                      }
                    >
                      {seller.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4 text-muted-foreground text-sm">
                    {formatDate(seller.createdAt)}
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
