"use client";

import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  Info,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useDashboardMode } from "@/components/dashboard/dashboard-mode-context";

export interface Notification {
  id: string;
  type: "order" | "customer" | "alert" | "info" | "success";
  title: string;
  description: string;
  time: string;
  read: boolean;
  details?: string;
}

interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const NotificationsContext = createContext<NotificationsContextType | null>(
  null
);

const DEMO_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "New order received",
    description: "Order #1234 from John Doe - $156.00",
    time: "2 min ago",
    read: false,
    details:
      "A new order has been placed by John Doe. The order includes 3 items totaling $156.00.",
  },
  {
    id: "2",
    type: "customer",
    title: "New customer signed up",
    description: "Sarah Johnson created an account",
    time: "15 min ago",
    read: false,
    details:
      "Sarah Johnson created a new customer account using sarah.johnson@email.com.",
  },
  {
    id: "3",
    type: "success",
    title: "Revenue milestone reached",
    description: "You've hit $50,000 in monthly sales",
    time: "1 hour ago",
    read: false,
    details:
      "Your store achieved $50,000 in monthly sales, up 25% versus the previous month.",
  },
  {
    id: "4",
    type: "alert",
    title: "Low stock alert",
    description: "Premium Headphones is running low (3 remaining)",
    time: "3 hours ago",
    read: true,
    details: "The inventory for Premium Headphones is down to 3 units.",
  },
];

export const notificationTypeConfig: Record<
  Notification["type"],
  { icon: LucideIcon; bgColor: string; iconColor: string }
> = {
  order: {
    icon: ShoppingCart,
    bgColor: "bg-blue-50 dark:bg-blue-950/50",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  customer: {
    icon: Users,
    bgColor: "bg-purple-50 dark:bg-purple-950/50",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  success: {
    icon: TrendingUp,
    bgColor: "bg-success-50 dark:bg-success-950/50",
    iconColor: "text-success-600 dark:text-success-400",
  },
  alert: {
    icon: AlertCircle,
    bgColor: "bg-warning-50 dark:bg-warning-950/50",
    iconColor: "text-warning-600 dark:text-warning-400",
  },
  info: {
    icon: Info,
    bgColor: "bg-muted",
    iconColor: "text-muted-foreground",
  },
};

export function NotificationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dashboardMode = useDashboardMode();
  const [notifications, setNotifications] = useState<Notification[]>(() =>
    dashboardMode === "demo" ? DEMO_NOTIFICATIONS : []
  );

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const value = useMemo(
    () => ({ notifications, unreadCount, markAsRead, markAllAsRead }),
    [notifications, unreadCount, markAsRead, markAllAsRead]
  );

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within NotificationsProvider"
    );
  }
  return context;
}
