"use client";

import {
  AlertTriangle,
  HelpCircle,
  LayoutGrid,
  MessageSquare,
  Settings,
  Shield,
} from "lucide-react";
import { RoleSidebar } from "@/components/shared/role-sidebar";

const STAFF_NAV_ITEMS = [
  { href: "/staff", label: "Overview", icon: LayoutGrid },
  { href: "/staff/moderation", label: "Moderation", icon: Shield },
  { href: "/staff/tickets", label: "Tickets", icon: MessageSquare },
  { href: "/staff/reports", label: "Reports", icon: AlertTriangle },
];

const STAFF_FOOTER_ITEMS = [
  { href: "/staff/settings", label: "Settings", icon: Settings },
  { href: "/staff/help", label: "Help", icon: HelpCircle },
];

export function StaffSidebar() {
  return (
    <RoleSidebar
      footerItems={STAFF_FOOTER_ITEMS}
      navItems={STAFF_NAV_ITEMS}
      title="Staff Panel"
      titleShort="S"
    />
  );
}
