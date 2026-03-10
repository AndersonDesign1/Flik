"use client";

import { Download, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DataTableToolbarProps {
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  onFilter?: () => void;
  onExport?: () => void;
  showFilter?: boolean;
  showExport?: boolean;
}

export function DataTableToolbar({
  searchPlaceholder = "Search...",
  onSearch,
  onFilter,
  onExport,
  showFilter = true,
  showExport = true,
}: DataTableToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="relative max-w-sm flex-1">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          className="h-9 pl-9"
          onChange={(e) => onSearch?.(e.target.value)}
          placeholder={searchPlaceholder}
        />
      </div>
      <div className="flex gap-2">
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
