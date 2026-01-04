"use client";

import type { LucideIcon } from "lucide-react";
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
} from "@/components/ui/sidebar";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export interface RoleSidebarProps {
  title: string;
  titleShort: string;
  navItems: NavItem[];
  footerItems?: NavItem[];
}

export function RoleSidebar({
  title,
  titleShort,
  navItems,
  footerItems = [],
}: RoleSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="border-sidebar-border/30 border-b px-4 py-3">
        <Link
          className="flex items-center gap-2.5 font-semibold text-foreground tracking-tight transition-all duration-200 hover:opacity-80"
          href="/"
        >
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary-violet text-white">
            <span className="font-bold text-xs">{titleShort}</span>
          </div>
          <span className="font-semibold text-sm group-data-[collapsible=icon]:hidden">
            {title}
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <Link href={item.href}>
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

      {footerItems.length > 0 && (
        <SidebarFooter className="border-sidebar-border/30 border-t">
          <SidebarGroup className="p-0">
            <SidebarGroupContent>
              <SidebarMenu>
                {footerItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={item.label}
                    >
                      <Link href={item.href}>
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
      )}
    </Sidebar>
  );
}
