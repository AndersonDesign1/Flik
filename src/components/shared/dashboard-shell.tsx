import type { ReactNode } from "react";
import { NotificationDropdown } from "@/components/dashboard/notification-dropdown";
import { ProfileMenu } from "@/components/dashboard/profile-menu";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NotificationsProvider } from "@/contexts/notifications-context";

interface DashboardShellProps {
  children: ReactNode;
  sidebar: ReactNode;
  title: string;
}

export function DashboardShell({
  children,
  sidebar,
  title,
}: DashboardShellProps) {
  return (
    <NotificationsProvider>
      <SidebarProvider>
        {sidebar}
        <SidebarInset>
          {/* Top Header Bar */}
          <header className="flex h-14 items-center justify-between border-border/30 border-b bg-surface-1 px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <h1 className="font-semibold text-base text-foreground">
                {title}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <NotificationDropdown />
              <ProfileMenu />
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mx-auto max-w-[1400px]">{children}</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </NotificationsProvider>
  );
}
