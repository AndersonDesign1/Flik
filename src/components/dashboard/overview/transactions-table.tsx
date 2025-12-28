"use client";

import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import {
  type StatusType,
  statusConfig,
  TableToolbar,
} from "@/components/dashboard/shared";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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

export interface Transaction {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: StatusType;
  payment: string;
  date: string;
  time: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
  onRowClick: (transaction: Transaction) => void;
}

export function TransactionsTable({
  transactions,
  onRowClick,
}: TransactionsTableProps) {
  const [searchValue, setSearchValue] = useState("");

  const filteredTransactions = transactions.filter(
    (tx) =>
      tx.customer.toLowerCase().includes(searchValue.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchValue.toLowerCase()) ||
      tx.product.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Card className="overflow-hidden p-0">
      <TableToolbar
        onSearchChange={setSearchValue}
        searchPlaceholder="Search"
        searchValue={searchValue}
        title="Recent Transactions"
      />

      <Table>
        <TableHeader>
          <TableRow className="border-border/30 hover:bg-transparent">
            <TableHead className="h-11 w-[100px] font-medium text-xs">
              ID ↕
            </TableHead>
            <TableHead className="h-11 font-medium text-xs">
              Customer ↕
            </TableHead>
            <TableHead className="h-11 font-medium text-xs">
              Product ↕
            </TableHead>
            <TableHead className="h-11 font-medium text-xs">Amount ↕</TableHead>
            <TableHead className="h-11 font-medium text-xs">Status ↕</TableHead>
            <TableHead className="h-11 font-medium text-xs">
              Payment ↕
            </TableHead>
            <TableHead className="h-11 font-medium text-xs">Date ↕</TableHead>
            <TableHead className="h-11 text-right font-medium text-xs">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((tx) => {
            const status = statusConfig[tx.status];
            return (
              <TableRow
                className="cursor-pointer border-border/20 transition-colors hover:bg-muted/50"
                key={tx.id}
                onClick={() => onRowClick(tx)}
              >
                <TableCell className="py-4 font-medium">{tx.id}</TableCell>
                <TableCell className="py-4">{tx.customer}</TableCell>
                <TableCell className="py-4 text-muted-foreground">
                  {tx.product}
                </TableCell>
                <TableCell className="py-4 font-semibold tabular-nums">
                  {tx.amount}
                </TableCell>
                <TableCell className="py-4">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-2.5 py-1 font-medium text-xs",
                      status.bg,
                      status.text,
                      status.border
                    )}
                  >
                    {tx.status}
                  </span>
                </TableCell>
                <TableCell className="py-4 text-muted-foreground">
                  {tx.payment}
                </TableCell>
                <TableCell className="py-4">
                  <span className="text-foreground">{tx.date}</span>
                  <span className="ml-1.5 text-muted-foreground text-xs">
                    {tx.time}
                  </span>
                </TableCell>
                <TableCell className="py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={(e) => e.stopPropagation()}
                        size="icon"
                        variant="ghost"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          onRowClick(tx);
                        }}
                      >
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(tx.id);
                        }}
                      >
                        Copy transaction ID
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                        Download invoice
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
  );
}
