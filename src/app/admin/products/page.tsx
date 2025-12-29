"use client";

import { MoreHorizontal, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

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

const statusVariants = {
  active: "success",
  pending: "secondary",
  rejected: "destructive",
} as const;

export default function AdminProductsPage() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-2xl text-gray-900">Products</h2>
          <p className="text-gray-500 text-sm">
            Moderate and manage all products.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input className="h-9 pl-9" placeholder="Search products..." />
        </div>
        <div className="flex gap-2">
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
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-gray-100 border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Product
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Seller
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Sales
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {PRODUCTS.filter(
                (p) => filter === "all" || p.status === filter
              ).map((product) => (
                <tr
                  className="transition-colors hover:bg-gray-50"
                  key={product.id}
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                        {product.image ? (
                          <Image
                            alt={product.name}
                            className="object-cover"
                            fill
                            src={product.image}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-gray-400 text-xs">
                            IMG
                          </div>
                        )}
                      </div>
                      <p className="font-medium text-gray-900 text-sm">
                        {product.name}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-600 text-sm">
                    {product.seller}
                  </td>
                  <td className="px-4 py-4 text-right font-medium text-gray-900 text-sm">
                    {product.price}
                  </td>
                  <td className="px-4 py-4 text-right text-gray-600 text-sm">
                    {product.sales}
                  </td>
                  <td className="px-4 py-4">
                    <Badge
                      className="capitalize"
                      variant={
                        statusVariants[
                          product.status as keyof typeof statusVariants
                        ]
                      }
                    >
                      {product.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="h-8 w-8 p-0" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View product</DropdownMenuItem>
                        <DropdownMenuItem>Approve</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
