"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface DashboardProduct {
  id: string;
  name: string;
  status: "active" | "draft" | "archived";
  price: number;
  inventory: number;
  sales: number;
  image: string;
}

const statusVariantMap = {
  active: "success",
  draft: "secondary",
  archived: "secondary",
} as const;

export const columns: ColumnDef<DashboardProduct>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        className="translate-y-[2px]"
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        className="translate-y-[2px]"
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: "Product",
    cell: ({ row }) => {
      const image = row.getValue("image") as string;
      return (
        <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-border/40 bg-surface-2">
          {image ? (
            <Image
              alt={row.getValue("name")}
              className="object-cover"
              fill
              src={image}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-semibold text-[10px] text-muted-foreground/50 uppercase tracking-wider">
              Img
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          className="-ml-3 h-8 font-semibold text-muted-foreground text-xs uppercase tracking-wider hover:text-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          variant="ghost"
        >
          Name
          <ArrowUpDown className="ml-1.5 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium text-foreground text-sm">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as keyof typeof statusVariantMap;
      return (
        <Badge
          className="text-xs capitalize"
          variant={statusVariantMap[status]}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return (
        <div className="text-right font-semibold text-foreground tabular-nums">
          {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "inventory",
    header: () => <div className="text-right">Inventory</div>,
    cell: ({ row }) => (
      <div className="text-right text-muted-foreground tabular-nums">
        {row.getValue("inventory")}
      </div>
    ),
  },
  {
    accessorKey: "sales",
    header: ({ column }) => {
      return (
        <Button
          className="w-full justify-end px-0 font-semibold text-muted-foreground text-xs uppercase tracking-wider hover:bg-transparent hover:text-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          variant="ghost"
        >
          Sales
          <ArrowUpDown className="ml-1.5 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-right text-muted-foreground tabular-nums">
        {row.getValue("sales")}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0" variant="ghost">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="font-normal text-muted-foreground text-xs">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuItem
              className="text-sm"
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              Copy product ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="text-sm">
              <Link href={`/products/${product.id}`}>View product page</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
