"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

export interface Customer {
  id: string;
  name: string;
  email: string;
  spent: number;
  lastOrder: string;
  status: "active" | "inactive";
  image?: string;
}

const statusVariantMap = {
  active: "success",
  inactive: "secondary",
} as const;

export const columns: ColumnDef<Customer>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Customer",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-border/30">
            <AvatarImage src={row.original.image} />
            <AvatarFallback className="bg-surface-2 font-medium text-muted-foreground text-xs">
              {row.original.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-foreground text-sm">
              {row.getValue("name")}
            </div>
            <div className="text-muted-foreground text-xs">
              {row.original.email}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          className="-ml-3 h-8 font-semibold text-muted-foreground text-xs uppercase tracking-wider hover:text-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          variant="ghost"
        >
          Email
          <ArrowUpDown className="ml-1.5 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-muted-foreground text-sm">
        {row.getValue("email")}
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
    accessorKey: "spent",
    header: () => <div className="text-right">Total Spent</div>,
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("spent"));
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
    accessorKey: "lastOrder",
    header: () => <div className="text-right">Last Order</div>,
    cell: ({ row }) => (
      <div className="text-right text-muted-foreground text-sm">
        {row.getValue("lastOrder")}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original;

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
              onClick={() => navigator.clipboard.writeText(customer.id)}
            >
              Copy customer ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-sm">
              View details
            </DropdownMenuItem>
            <DropdownMenuItem className="text-sm">
              Edit customer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
