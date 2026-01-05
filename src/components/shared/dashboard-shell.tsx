"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { NotificationDropdown } from "@/components/dashboard/notification-dropdown";
import { ProfileMenu } from "@/components/dashboard/profile-menu";
import {
  CommandPalette,
  type SearchRole,
} from "@/components/shared/command-palette";
import { Button } from "@/components/ui/button";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { CartProvider, useCart } from "@/contexts/cart-context";
import { NotificationsProvider } from "@/contexts/notifications-context";

function CartButton() {
  const { totalItems } = useCart();

  return (
    <Button asChild className="relative" size="icon" variant="ghost">
      <Link href="/cart">
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary font-medium text-primary-foreground text-xs">
            {totalItems > 9 ? "9+" : totalItems}
          </span>
        )}
      </Link>
    </Button>
  );
}

interface DashboardShellProps {
  children: ReactNode;
  sidebar: ReactNode;
  title: string;
  searchRole?: SearchRole;
}

function DashboardContent({
  children,
  sidebar,
  title,
  searchRole = "seller",
}: DashboardShellProps) {
  const isUser = searchRole === "user";

  return (
    <NotificationsProvider>
      <SidebarProvider>
        {sidebar}
        <SidebarInset>
          <header className="flex h-14 items-center justify-between border-border/30 border-b bg-surface-1 px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <h1 className="font-semibold text-base text-foreground">
                {title}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <CommandPalette searchRole={searchRole} />
              {isUser && (
                <>
                  <Link
                    className="font-medium text-muted-foreground text-sm hover:text-foreground"
                    href="/categories"
                  >
                    Explore
                  </Link>
                  <CartButton />
                </>
              )}
              <NotificationDropdown />
              <ProfileMenu />
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="mx-auto w-full max-w-[1400px]">{children}</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </NotificationsProvider>
  );
}

export function DashboardShell(props: DashboardShellProps) {
  // Only wrap with CartProvider for user role
  if (props.searchRole === "user") {
    return (
      <CartProvider>
        <DashboardContent {...props} />
      </CartProvider>
    );
  }

  return <DashboardContent {...props} />;
}
