"use client";

import { LayoutGrid, Settings, ShieldCheck, Store, Users } from "lucide-react";
import { RoleSidebar } from "@/components/shared/role-sidebar";

const SUPER_ADMIN_NAV_ITEMS = [
  { href: "/super-admin", label: "Overview", icon: LayoutGrid },
  { href: "/super-admin/people", label: "People", icon: Users },
  { href: "/super-admin/admins", label: "Internal Team", icon: ShieldCheck },
  { href: "/super-admin/sellers", label: "Sellers", icon: Store },
];

const SUPER_ADMIN_FOOTER_ITEMS = [
  { href: "/account/settings", label: "Settings", icon: Settings },
];

export function SuperAdminSidebar() {
  return (
    <RoleSidebar
      footerItems={SUPER_ADMIN_FOOTER_ITEMS}
      navItems={SUPER_ADMIN_NAV_ITEMS}
      title="Super Admin"
      titleShort="SA"
    />
  );
}
