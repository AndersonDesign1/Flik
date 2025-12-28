import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gray-900 text-gray-50 dark:bg-gray-100 dark:text-gray-900",
        secondary:
          "border-gray-200 bg-gray-100 text-gray-700 dark:border-gray-300 dark:bg-gray-200 dark:text-gray-600",
        destructive:
          "border-destructive-200 bg-destructive-50 text-destructive-700 dark:border-destructive-100 dark:bg-destructive-50 dark:text-destructive-500",
        success:
          "border-success-200 bg-success-50 text-success-700 dark:border-success-100 dark:bg-success-50 dark:text-success-500",
        warning:
          "border-warning-100 bg-warning-50 text-warning-600 dark:border-warning-100 dark:bg-warning-50 dark:text-warning-500",
        accent:
          "border-accent-200 bg-accent-50 text-accent-700 dark:border-accent-100 dark:bg-accent-50 dark:text-accent-400",
        outline: "border-border bg-transparent text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
