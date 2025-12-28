import type * as React from "react";

import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/40 bg-surface-1 p-5",
        className
      )}
      data-slot="card"
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mb-4 flex items-center justify-between", className)}
      data-slot="card-header"
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn("font-medium text-muted-foreground text-sm", className)}
      data-slot="card-title"
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="card-description"
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("", className)} data-slot="card-content" {...props} />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mt-4 flex items-center", className)}
      data-slot="card-footer"
      {...props}
    />
  );
}

// Nested card for use inside detail views (smaller padding, uses bg-card)
function CardNested({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/40 bg-card p-4",
        className
      )}
      data-slot="card-nested"
      {...props}
    />
  );
}

// List card with dividers for stacked items
function CardList({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "divide-y divide-border/40 rounded-xl border border-border/40 bg-card",
        className
      )}
      data-slot="card-list"
      {...props}
    />
  );
}

// List item for CardList
function CardListItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center justify-between p-4", className)}
      data-slot="card-list-item"
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardNested,
  CardList,
  CardListItem,
};
