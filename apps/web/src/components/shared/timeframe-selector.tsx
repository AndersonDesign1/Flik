"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type TimeframeOption = "24h" | "7d" | "30d" | "90d" | "12m" | "ytd";

interface TimeframeSelectorProps {
  value: TimeframeOption;
  onChange: (value: TimeframeOption) => void;
  options?: TimeframeOption[];
  className?: string;
}

const TIMEFRAME_LABELS: Record<TimeframeOption, string> = {
  "24h": "24h",
  "7d": "7d",
  "30d": "30d",
  "90d": "90d",
  "12m": "12m",
  ytd: "YTD",
};

export function TimeframeSelector({
  value,
  onChange,
  options = ["7d", "30d", "90d", "12m"],
  className,
}: TimeframeSelectorProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-lg bg-muted/50 p-0.5",
        className
      )}
    >
      {options.map((option) => (
        <Button
          className={cn(
            "h-6 rounded-md px-2 font-medium text-xs transition-all",
            value === option
              ? "bg-background text-foreground shadow-sm"
              : "bg-transparent text-muted-foreground hover:text-foreground"
          )}
          key={option}
          onClick={() => onChange(option)}
          size="sm"
          variant="ghost"
        >
          {TIMEFRAME_LABELS[option]}
        </Button>
      ))}
    </div>
  );
}

// Hook for easy usage
export function useTimeframe(defaultValue: TimeframeOption = "30d") {
  const [timeframe, setTimeframe] = useState<TimeframeOption>(defaultValue);
  return { timeframe, setTimeframe };
}
