"use client";

import { Bell } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  notificationTypeConfig,
  useNotifications,
} from "@/contexts/notifications-context";

export function NotificationDropdown() {
  const { notifications, unreadCount, markAllAsRead } = useNotifications();

  // Show only first 4 for dropdown
  const displayNotifications = notifications.slice(0, 4);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className="relative h-8 w-8" size="icon" variant="ghost">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive-500 font-medium text-[10px] text-white">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-2 py-1.5">
          <DropdownMenuLabel className="p-0 font-semibold text-sm">
            Notifications
          </DropdownMenuLabel>
          {unreadCount > 0 && (
            <button
              className="text-muted-foreground text-xs transition-colors hover:text-foreground"
              onClick={markAllAsRead}
              type="button"
            >
              Mark all as read
            </button>
          )}
        </div>
        <DropdownMenuSeparator />
        <div className="max-h-80 overflow-y-auto">
          {displayNotifications.length > 0 ? (
            displayNotifications.map((notification) => {
              const config = notificationTypeConfig[notification.type];
              const Icon = config.icon;

              return (
                <DropdownMenuItem
                  className="flex cursor-pointer items-start gap-3 p-3"
                  key={notification.id}
                >
                  <div
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${config.bgColor}`}
                  >
                    <Icon className={`h-4 w-4 ${config.iconColor}`} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p
                      className={`text-sm leading-tight ${
                        notification.read
                          ? "text-muted-foreground"
                          : "font-medium text-foreground"
                      }`}
                    >
                      {notification.title}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {notification.description}
                    </p>
                    <p className="text-[10px] text-muted-foreground/60">
                      {notification.time}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                  )}
                </DropdownMenuItem>
              );
            })
          ) : (
            <div className="p-6 text-center">
              <Bell className="mx-auto h-8 w-8 text-muted-foreground/50" />
              <p className="mt-2 text-muted-foreground text-sm">
                No notifications
              </p>
            </div>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="justify-center font-medium text-foreground text-xs"
        >
          <Link href="/dashboard/notifications">View all notifications</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
