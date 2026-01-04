"use client";

import { MoreHorizontal } from "lucide-react";
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

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

const sellerStatusConfig = {
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
  suspended: {
    bg: "bg-error-red-50 dark:bg-error-red/10",
    text: "text-error-red dark:text-error-red",
    border: "border-error-red-100 dark:border-error-red/20",
  },
} as const;

export default function AdminSellersPage() {
  const [selectedSeller, setSelectedSeller] = useState<
    (typeof SELLERS)[0] | null
  >(null);
  const [searchValue, setSearchValue] = useState("");

  const filteredSellers = SELLERS.filter(
    (seller) =>
      seller.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      seller.email.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-2xl text-foreground">Sellers</h2>
        <p className="text-muted-foreground text-sm">
          Manage all sellers on the platform.
        </p>
      </div>

      <Card className="overflow-hidden p-0">
        <TableToolbar
          onSearchChange={setSearchValue}
          searchPlaceholder="Search sellers..."
          searchValue={searchValue}
          title="All Sellers"
        />

        <Table>
          <TableHeader>
            <TableRow className="border-border/30 hover:bg-transparent">
              <TableHead className="h-11 font-medium text-xs">Seller</TableHead>
              <TableHead className="h-11 font-medium text-xs">
                Products
              </TableHead>
              <TableHead className="h-11 font-medium text-xs">
                Revenue
              </TableHead>
              <TableHead className="h-11 font-medium text-xs">Status</TableHead>
              <TableHead className="h-11 font-medium text-xs">Joined</TableHead>
              <TableHead className="h-11 w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSellers.map((seller) => {
              const status =
                sellerStatusConfig[
                  seller.status as keyof typeof sellerStatusConfig
                ];
              return (
                <TableRow
                  className="cursor-pointer border-border/20 transition-colors hover:bg-muted/50"
                  key={seller.id}
                  onClick={() => setSelectedSeller(seller)}
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-full bg-primary-violet font-medium text-sm text-white">
                        {seller.name.charAt(0)}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <p className="font-medium text-foreground text-sm">
                          {seller.name}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {seller.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-muted-foreground">
                    {seller.products}
                  </TableCell>
                  <TableCell className="py-4 font-semibold tabular-nums">
                    {seller.revenue}
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
                      {seller.status}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 text-muted-foreground">
                    {seller.joined}
                  </TableCell>
                  <TableCell className="py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className="size-8"
                          onClick={(e) => e.stopPropagation()}
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Suspend seller</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

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
                  <div className="rounded-lg border border-border p-4">
                    <p className="text-muted-foreground text-xs">Products</p>
                    <p className="font-bold text-foreground text-xl">
                      {selectedSeller.products}
                    </p>
                  </div>
                  <div className="rounded-lg border border-border p-4">
                    <p className="text-muted-foreground text-xs">Revenue</p>
                    <p className="font-bold text-foreground text-xl">
                      {selectedSeller.revenue}
                    </p>
                  </div>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-muted-foreground text-xs">Status</p>
                  <span
                    className={cn(
                      "mt-1 inline-flex items-center rounded-full border px-2.5 py-1 font-medium text-xs capitalize",
                      sellerStatusConfig[
                        selectedSeller.status as keyof typeof sellerStatusConfig
                      ].bg,
                      sellerStatusConfig[
                        selectedSeller.status as keyof typeof sellerStatusConfig
                      ].text,
                      sellerStatusConfig[
                        selectedSeller.status as keyof typeof sellerStatusConfig
                      ].border
                    )}
                  >
                    {selectedSeller.status}
                  </span>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-muted-foreground text-xs">Joined</p>
                  <p className="font-medium text-foreground text-sm">
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
