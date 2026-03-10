import type * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-lg bg-surface-2 px-3 py-2 text-foreground text-sm",
        "border border-border/50 shadow-sm",
        "transition-all duration-200",
        "placeholder:text-muted-foreground",
        "hover:border-border/80 hover:bg-surface-2/80",
        "focus-visible:border-accent-500 focus-visible:bg-surface-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "file:border-0 file:bg-transparent file:font-medium file:text-sm",
        className
      )}
      data-slot="input"
      type={type}
      {...props}
    />
  );
}

export { Input };
