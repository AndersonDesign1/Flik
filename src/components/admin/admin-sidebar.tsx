"use client";

import {
  BarChart3,
  Box,
  CreditCard,
  HelpCircle,
  LayoutGrid,
  Settings,
  Store,
  Users,
} from "lucide-react";
import { RoleSidebar } from "@/components/shared/role-sidebar";

const ADMIN_NAV_ITEMS = [
  { href: "/admin", label: "Overview", icon: LayoutGrid },
  { href: "/admin/sellers", label: "Sellers", icon: Store },
  { href: "/admin/products", label: "Products", icon: Box },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/payouts", label: "Payouts", icon: CreditCard },
];

const ADMIN_FOOTER_ITEMS = [
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/admin/help", label: "Help", icon: HelpCircle },
];

export function AdminSidebar() {
  return (
    <RoleSidebar
      footerItems={ADMIN_FOOTER_ITEMS}
      navItems={ADMIN_NAV_ITEMS}
      title="Admin Panel"
      titleShort="A"
    />
  );
}
