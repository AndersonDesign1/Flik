import { CheckCircle2, Clock, XCircle } from "lucide-react";

export const statusConfig = {
  Completed: {
    bg: "bg-accent-teal-50 dark:bg-accent-teal/10",
    text: "text-accent-teal-700 dark:text-accent-teal",
    border: "border-accent-teal-200 dark:border-accent-teal/20",
    icon: CheckCircle2,
  },
  Failed: {
    bg: "bg-error-red-50 dark:bg-error-red/10",
    text: "text-error-red dark:text-error-red",
    border: "border-error-red-100 dark:border-error-red/20",
    icon: XCircle,
  },
  Pending: {
    bg: "bg-amber-50 dark:bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-500/20",
    icon: Clock,
  },
} as const;

export type StatusType = keyof typeof statusConfig;

export const productStatusConfig = {
  active: {
    bg: "bg-accent-teal-50 dark:bg-accent-teal/10",
    text: "text-accent-teal-700 dark:text-accent-teal",
    border: "border-accent-teal-200 dark:border-accent-teal/20",
    label: "Active",
  },
  draft: {
    bg: "bg-gray-50 dark:bg-gray-500/10",
    text: "text-gray-600 dark:text-gray-400",
    border: "border-gray-200 dark:border-gray-500/20",
    label: "Draft",
  },
  archived: {
    bg: "bg-amber-50 dark:bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-500/20",
    label: "Archived",
  },
} as const;

export type ProductStatusType = keyof typeof productStatusConfig;

export const customerStatusConfig = {
  active: {
    bg: "bg-accent-teal-50 dark:bg-accent-teal/10",
    text: "text-accent-teal-700 dark:text-accent-teal",
    border: "border-accent-teal-200 dark:border-accent-teal/20",
    label: "Active",
  },
  inactive: {
    bg: "bg-gray-50 dark:bg-gray-500/10",
    text: "text-gray-600 dark:text-gray-400",
    border: "border-gray-200 dark:border-gray-500/20",
    label: "Inactive",
  },
} as const;

export type CustomerStatusType = keyof typeof customerStatusConfig;

export const orderStatusConfig = {
  completed: {
    bg: "bg-accent-teal-50 dark:bg-accent-teal/10",
    text: "text-accent-teal-700 dark:text-accent-teal",
    border: "border-accent-teal-200 dark:border-accent-teal/20",
    label: "Completed",
  },
  refunded: {
    bg: "bg-amber-50 dark:bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-500/20",
    label: "Refunded",
  },
  pending: {
    bg: "bg-gray-50 dark:bg-gray-500/10",
    text: "text-gray-600 dark:text-gray-400",
    border: "border-gray-200 dark:border-gray-500/20",
    label: "Pending",
  },
} as const;

export type OrderStatusType = keyof typeof orderStatusConfig;
