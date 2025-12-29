"use client";

import {
  BarChart3,
  Box,
  CreditCard,
  HelpCircle,
  LayoutGrid,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/dashboard/products", label: "Products", icon: Box },
  {
    href: "/dashboard/analytics",
    label: "Reports & Analytics",
    icon: BarChart3,
  },
  { href: "/dashboard/customers", label: "Customers", icon: Users },
  { href: "/dashboard/payouts", label: "Payouts", icon: CreditCard },
];

const FOOTER_ITEMS = [
  { href: "/dashboard/help", label: "Help Center", icon: HelpCircle },
  { href: "/dashboard/feedback", label: "Feedback", icon: MessageSquare },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar>
      {/* Header with Logo */}
      <SidebarHeader className="border-border/30 border-b px-4 py-3">
        <Link
          className="flex items-center gap-2.5 font-semibold text-foreground tracking-tight transition-all duration-200 hover:opacity-80"
          href="/"
          onClick={handleLinkClick}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-900 text-gray-50 dark:bg-gray-100 dark:text-gray-900">
            <span className="font-bold text-xs">O</span>
          </div>
          <span className="font-semibold text-sm group-data-[collapsible=icon]:hidden">
            Overlay
          </span>
        </Link>
      </SidebarHeader>

      {/* Main Navigation */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <Link href={item.href} onClick={handleLinkClick}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer Links */}
      <SidebarFooter className="border-border/30 border-t">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {FOOTER_ITEMS.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <Link href={item.href} onClick={handleLinkClick}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
