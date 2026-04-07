"use client";

import { Box, LayoutGrid, Settings, Store, Users } from "lucide-react";
import { RoleSidebar } from "@/components/shared/role-sidebar";

const STAFF_NAV_ITEMS = [
  { href: "/staff", label: "Overview", icon: LayoutGrid },
  { href: "/staff/users", label: "Users", icon: Users },
  { href: "/staff/sellers", label: "Sellers", icon: Store },
  { href: "/staff/products", label: "Products", icon: Box },
];

const STAFF_FOOTER_ITEMS = [
  { href: "/account/settings", label: "Settings", icon: Settings },
];

export function StaffSidebar() {
  return (
    <RoleSidebar
      footerItems={STAFF_FOOTER_ITEMS}
      navItems={STAFF_NAV_ITEMS}
      title="Staff Workspace"
      titleShort="S"
    />
  );
}
