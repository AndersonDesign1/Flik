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

// Mock notifications data
const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "New order received",
    description: "Order #1234 from John Doe - $156.00",
    time: "2 min ago",
    read: false,
    details:
      "A new order has been placed by John Doe. The order includes 3 items totaling $156.00. The customer has opted for standard shipping to their address in San Francisco, CA.",
  },
  {
    id: "2",
    type: "customer",
    title: "New customer signed up",
    description: "Sarah Johnson created an account",
    time: "15 min ago",
    read: false,
    details:
      "Sarah Johnson has created a new customer account. They signed up using their email address sarah.johnson@email.com.",
  },
  {
    id: "3",
    type: "success",
    title: "Revenue milestone reached",
    description: "You've hit $50,000 in monthly sales",
    time: "1 hour ago",
    read: false,
    details:
      "Congratulations! Your store has achieved $50,000 in sales this month. This represents a 25% increase compared to last month.",
  },
  {
    id: "4",
    type: "alert",
    title: "Low stock alert",
    description: "Premium Headphones is running low (3 remaining)",
    time: "3 hours ago",
    read: true,
    details:
      "The inventory for Premium Headphones has dropped to 3 units. Consider restocking soon to avoid stockouts.",
  },
  {
    id: "5",
    type: "order",
    title: "Order shipped",
    description: "Order #1230 shipped via FedEx",
    time: "5 hours ago",
    read: true,
    details:
      "Order #1230 has been shipped to the customer via FedEx. Tracking number: 1234567890.",
  },
  {
    id: "6",
    type: "info",
    title: "System maintenance",
    description: "Scheduled maintenance on Dec 30, 2024",
    time: "1 day ago",
    read: true,
    details:
      "A scheduled system maintenance is planned for December 30, 2024 from 2:00 AM to 4:00 AM UTC.",
  },
  {
    id: "7",
    type: "customer",
    title: "Customer feedback received",
    description: "5-star review from Emily Chen",
    time: "2 days ago",
    read: true,
    details:
      "Emily Chen left a 5-star review for Premium Headphones: 'Amazing sound quality and super comfortable!'",
  },
  {
    id: "8",
    type: "alert",
    title: "Payment failed",
    description: "Subscription payment for Pro plan failed",
    time: "3 days ago",
    read: true,
    details:
      "The automatic payment for your Pro plan subscription failed. Please update your payment method.",
  },
];

// Type config for icons
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
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

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
