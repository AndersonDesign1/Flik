"use client";

import { Bell } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  type Notification,
  notificationTypeConfig,
  useNotifications,
} from "@/contexts/notifications-context";
import { cn } from "@/lib/utils";

export default function NotificationsPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotifications();
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const filteredNotifications =
    filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-foreground text-lg">
            Notifications
          </h2>
          <p className="text-muted-foreground text-sm">
            Stay updated on your store activity.
          </p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} size="sm" variant="outline">
            Mark all as read
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-1 rounded-lg bg-muted/50 p-1">
        <button
          className={cn(
            "rounded-md px-4 py-1.5 font-medium text-sm transition-colors",
            filter === "all"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => setFilter("all")}
          type="button"
        >
          All
        </button>
        <button
          className={cn(
            "rounded-md px-4 py-1.5 font-medium text-sm transition-colors",
            filter === "unread"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => setFilter("unread")}
          type="button"
        >
          Unread{unreadCount > 0 && ` (${unreadCount})`}
        </button>
      </div>

      {/* Notifications List */}
      <Card>
        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-border/40">
            {filteredNotifications.map((notification) => {
              const config = notificationTypeConfig[notification.type];
              const Icon = config.icon;

              return (
                <button
                  className={cn(
                    "flex w-full items-start gap-4 p-4 text-left transition-colors hover:bg-muted/50",
                    !notification.read && "bg-muted/30"
                  )}
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  type="button"
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                      config.bgColor
                    )}
                  >
                    <Icon className={cn("h-5 w-5", config.iconColor)} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p
                          className={cn(
                            "text-sm",
                            notification.read
                              ? "text-foreground"
                              : "font-semibold text-foreground"
                          )}
                        >
                          {notification.title}
                        </p>
                        <p className="mt-0.5 text-muted-foreground text-sm">
                          {notification.description}
                        </p>
                        <p className="mt-1 text-muted-foreground/60 text-xs">
                          {notification.time}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <Bell className="h-12 w-12 text-muted-foreground/30" />
            <h3 className="mt-4 font-medium text-foreground">
              No notifications
            </h3>
            <p className="mt-1 max-w-sm text-muted-foreground text-sm">
              {filter === "unread"
                ? "You're all caught up! No unread notifications."
                : "You don't have any notifications yet."}
            </p>
          </div>
        )}
      </Card>

      {/* Notification Detail Sheet */}
      <Sheet
        onOpenChange={(open) => !open && setSelectedNotification(null)}
        open={!!selectedNotification}
      >
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          {selectedNotification && (
            <>
              <SheetHeader>
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg",
                      notificationTypeConfig[selectedNotification.type].bgColor
                    )}
                  >
                    {(() => {
                      const Icon =
                        notificationTypeConfig[selectedNotification.type].icon;
                      return (
                        <Icon
                          className={cn(
                            "h-6 w-6",
                            notificationTypeConfig[selectedNotification.type]
                              .iconColor
                          )}
                        />
                      );
                    })()}
                  </div>
                  <div className="flex-1">
                    <SheetTitle className="text-left">
                      {selectedNotification.title}
                    </SheetTitle>
                    <p className="mt-1 text-muted-foreground text-sm">
                      {selectedNotification.time}
                    </p>
                  </div>
                </div>
              </SheetHeader>

              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="mb-2 font-medium text-foreground text-sm">
                    Summary
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {selectedNotification.description}
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 font-medium text-foreground text-sm">
                    Details
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {selectedNotification.details}
                  </p>
                </div>

                <div className="flex items-center gap-2 border-border/40 border-t pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => setSelectedNotification(null)}
                    variant="outline"
                  >
                    Close
                  </Button>
                  {selectedNotification.type === "order" && (
                    <Button className="flex-1">View Order</Button>
                  )}
                  {selectedNotification.type === "customer" && (
                    <Button className="flex-1">View Customer</Button>
                  )}
                  {selectedNotification.type === "alert" && (
                    <Button className="flex-1">Take Action</Button>
                  )}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
