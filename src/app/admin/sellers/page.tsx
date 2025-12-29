"use client";

import { MoreHorizontal, Search } from "lucide-react";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const SELLERS = [
  {
    id: "1",
    name: "Design Studio Co",
    email: "hello@designstudio.co",
    products: 45,
    revenue: "$12,450",
    status: "active",
    joined: "Jan 15, 2024",
  },
  {
    id: "2",
    name: "Creative Assets",
    email: "team@creativeassets.io",
    products: 23,
    revenue: "$8,920",
    status: "active",
    joined: "Feb 3, 2024",
  },
  {
    id: "3",
    name: "UI Kit Pro",
    email: "support@uikitpro.com",
    products: 67,
    revenue: "$34,100",
    status: "pending",
    joined: "Mar 12, 2024",
  },
  {
    id: "4",
    name: "Template Hub",
    email: "info@templatehub.com",
    products: 12,
    revenue: "$3,200",
    status: "suspended",
    joined: "Apr 8, 2024",
  },
  {
    id: "5",
    name: "Icon Foundry",
    email: "hello@iconfoundry.co",
    products: 89,
    revenue: "$45,600",
    status: "active",
    joined: "May 22, 2024",
  },
];

const statusVariants = {
  active: "success",
  pending: "secondary",
  suspended: "destructive",
} as const;

export default function AdminSellersPage() {
  const [selectedSeller, setSelectedSeller] = useState<
    (typeof SELLERS)[0] | null
  >(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-2xl text-gray-900">Sellers</h2>
          <p className="text-gray-500 text-sm">
            Manage all sellers on the platform.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input className="h-9 pl-9" placeholder="Search sellers..." />
        </div>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-gray-100 border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Seller
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Products
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {SELLERS.map((seller) => (
                <tr
                  className="cursor-pointer transition-colors hover:bg-gray-50"
                  key={seller.id}
                  onClick={() => setSelectedSeller(seller)}
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 font-medium text-gray-600 text-sm">
                        {seller.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {seller.name}
                        </p>
                        <p className="text-gray-500 text-xs">{seller.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-600 text-sm">
                    {seller.products}
                  </td>
                  <td className="px-4 py-4 font-medium text-gray-900 text-sm">
                    {seller.revenue}
                  </td>
                  <td className="px-4 py-4">
                    <Badge
                      className="capitalize"
                      variant={
                        statusVariants[
                          seller.status as keyof typeof statusVariants
                        ]
                      }
                    >
                      {seller.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-gray-500 text-sm">
                    {seller.joined}
                  </td>
                  <td className="px-4 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className="h-8 w-8 p-0"
                          onClick={(e) => e.stopPropagation()}
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Suspend seller</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Detail Sheet */}
      <Sheet
        onOpenChange={(open) => !open && setSelectedSeller(null)}
        open={!!selectedSeller}
      >
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          {selectedSeller && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedSeller.name}</SheetTitle>
                <SheetDescription>{selectedSeller.email}</SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-gray-200 p-4">
                    <p className="text-gray-500 text-xs">Products</p>
                    <p className="font-bold text-gray-900 text-xl">
                      {selectedSeller.products}
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-4">
                    <p className="text-gray-500 text-xs">Revenue</p>
                    <p className="font-bold text-gray-900 text-xl">
                      {selectedSeller.revenue}
                    </p>
                  </div>
                </div>
                <div className="rounded-lg border border-gray-200 p-4">
                  <p className="text-gray-500 text-xs">Status</p>
                  <Badge
                    className="mt-1 capitalize"
                    variant={
                      statusVariants[
                        selectedSeller.status as keyof typeof statusVariants
                      ]
                    }
                  >
                    {selectedSeller.status}
                  </Badge>
                </div>
                <div className="rounded-lg border border-gray-200 p-4">
                  <p className="text-gray-500 text-xs">Joined</p>
                  <p className="font-medium text-gray-900 text-sm">
                    {selectedSeller.joined}
                  </p>
                </div>
              </div>
              <SheetFooter>
                <Button variant="outline">Suspend</Button>
                <Button>View Products</Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
