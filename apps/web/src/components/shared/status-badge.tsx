"use client";

import {
  type CustomerStatusType,
  customerStatusConfig,
  type OrderStatusType,
  orderStatusConfig,
  type ProductStatusType,
  productStatusConfig,
  type StatusType,
  statusConfig,
} from "@/components/shared/status-config";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: StatusType | ProductStatusType | CustomerStatusType | OrderStatusType;
  type?: "general" | "product" | "customer" | "order";
  className?: string;
}

export function StatusBadge({
  status,
  type = "general",
  className,
}: StatusBadgeProps) {
  if (type === "product") {
    const config = productStatusConfig[status as ProductStatusType];
    if (!config) {
      return null;
    }

    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-1 font-medium text-xs",
          config.bg,
          config.text,
          config.border,
          className
        )}
      >
        {config.label}
      </span>
    );
  }

  if (type === "customer") {
    const config = customerStatusConfig[status as CustomerStatusType];
    if (!config) {
      return null;
    }

    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-1 font-medium text-xs",
          config.bg,
          config.text,
          config.border,
          className
        )}
      >
        {config.label}
      </span>
    );
  }

  if (type === "order") {
    const config = orderStatusConfig[status as OrderStatusType];
    if (!config) {
      return null;
    }

    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-1 font-medium text-xs",
          config.bg,
          config.text,
          config.border,
          className
        )}
      >
        {config.label}
      </span>
    );
  }

  const config = statusConfig[status as StatusType];
  if (!config) {
    return null;
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 font-medium text-xs",
        config.bg,
        config.text,
        config.border,
        className
      )}
    >
      {status}
    </span>
  );
}
