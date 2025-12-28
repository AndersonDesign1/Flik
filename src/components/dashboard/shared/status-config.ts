import { CheckCircle2, Clock, XCircle } from "lucide-react";

export const statusConfig = {
  Completed: {
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-500/20",
    icon: CheckCircle2,
  },
  Failed: {
    bg: "bg-red-50 dark:bg-red-500/10",
    text: "text-red-600 dark:text-red-400",
    border: "border-red-200 dark:border-red-500/20",
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
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-500/20",
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
