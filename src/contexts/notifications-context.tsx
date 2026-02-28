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

// Notifications are loaded from user activity.
// Start empty in live mode until backend data is wired.
const INITIAL_NOTIFICATIONS: Notification[] = [];

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
