"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLMotionProps, motion } from "motion/react";
import { forwardRef } from "react";
import { SPRING_PHYSICS } from "@/lib/design-system";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gray-900 text-gray-50 shadow-sm hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200",
        primary:
          "bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-md hover:from-accent-600 hover:to-accent-700 hover:shadow-lg dark:from-accent-400 dark:to-accent-500 dark:text-gray-950",
        destructive:
          "bg-destructive-500 text-white hover:bg-destructive-600 dark:bg-destructive-500 dark:hover:bg-destructive-600",
        outline:
          "border border-border bg-transparent text-foreground shadow-sm hover:border-border/80 hover:bg-surface-2",
        secondary:
          "border border-transparent bg-surface-2 text-foreground hover:border-border/30 hover:bg-surface-3",
        ghost: "text-foreground hover:bg-surface-2",
        link: "text-accent-600 underline-offset-4 hover:underline dark:text-accent-400",
        glass: "glass text-foreground hover:bg-surface-2/80",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-lg px-6 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "ref">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        transition={SPRING_PHYSICS.fast}
        whileTap={{ scale: 0.98 }}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
