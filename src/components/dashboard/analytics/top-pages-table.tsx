"use client";

import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { TableToolbar } from "@/components/dashboard/shared/table-toolbar";
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
import type { PageData } from "./page-detail";

interface TopPagesTableProps {
  pages: PageData[];
  onRowClick: (page: PageData) => void;
}

export function TopPagesTable({ pages, onRowClick }: TopPagesTableProps) {
  const [searchValue, setSearchValue] = useState("");

  const filteredPages = pages.filter(
    (page) =>
      page.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      page.path.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Card className="overflow-hidden p-0">
      <TableToolbar
        onSearchChange={setSearchValue}
        searchPlaceholder="Search"
        searchValue={searchValue}
        title="Top Performing Pages"
      />

      <Table>
        <TableHeader>
          <TableRow className="border-border/30 hover:bg-transparent">
            <TableHead className="h-11 font-medium text-xs">Page</TableHead>
            <TableHead className="h-11 text-right font-medium text-xs">
              Views
            </TableHead>
            <TableHead className="h-11 text-right font-medium text-xs">
              Bounce Rate
            </TableHead>
            <TableHead className="h-11 text-right font-medium text-xs">
              Avg. Time
            </TableHead>
            <TableHead className="h-11 text-right font-medium text-xs">
              Trend
            </TableHead>
            <TableHead className="h-11 text-right font-medium text-xs">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPages.map((page) => (
            <TableRow
              className="cursor-pointer border-border/20 transition-colors hover:bg-muted/50"
              key={page.path}
              onClick={() => onRowClick(page)}
            >
              <TableCell className="py-4">
                <div>
                  <div className="font-medium text-foreground">
                    {page.title}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {page.path}
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-4 text-right font-semibold tabular-nums">
                {page.views}
              </TableCell>
              <TableCell className="py-4 text-right text-muted-foreground tabular-nums">
                {page.bounceRate}
              </TableCell>
              <TableCell className="py-4 text-right text-muted-foreground tabular-nums">
                {page.avgTime}
              </TableCell>
              <TableCell className="py-4 text-right">
                <span
                  className={cn(
                    "font-medium text-xs",
                    page.trend.startsWith("+")
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-500"
                  )}
                >
                  {page.trend}
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
                        onRowClick(page);
                      }}
                    >
                      View details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(page.path, "_blank");
                      }}
                    >
                      Open in browser
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(page.path);
                      }}
                    >
                      Copy path
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
