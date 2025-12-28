import { AppSidebar } from "@/components/app-sidebar";
import { NotificationDropdown } from "@/components/header/notification-dropdown";
import { ProfileMenu } from "@/components/header/profile-menu";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NotificationsProvider } from "@/contexts/notifications-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NotificationsProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {/* Top Header Bar */}
          <header className="flex h-14 items-center justify-between border-border/30 border-b bg-surface-1 px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <h1 className="font-semibold text-base text-foreground">
                Dashboard
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
