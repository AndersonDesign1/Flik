"use client";

import { Download, Filter, Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TableToolbarProps {
  title: string;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onFilter?: () => void;
  onExport?: () => void;
  showFilter?: boolean;
  showExport?: boolean;
}

export function TableToolbar({
  title,
  searchPlaceholder = "Search",
  searchValue = "",
  onSearchChange,
  onFilter,
  onExport,
  showFilter = true,
  showExport = true,
}: TableToolbarProps) {
  return (
    <div className="flex items-center justify-between border-border/30 border-b px-5 py-4">
      <h3 className="font-semibold text-foreground text-sm">{title}</h3>
      <div className="flex items-center gap-3">
        <div className="relative">
          <SearchIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            className="h-9 w-44 rounded-lg border border-border bg-background pr-3 pl-9 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={searchPlaceholder}
            type="text"
            value={searchValue}
          />
        </div>
        {showFilter && (
          <Button
            className="h-9 gap-2"
            onClick={onFilter}
            size="sm"
            variant="outline"
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        )}
        {showExport && (
          <Button
            className="h-9 gap-2"
            onClick={onExport}
            size="sm"
            variant="outline"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        )}
      </div>
    </div>
  );
}
