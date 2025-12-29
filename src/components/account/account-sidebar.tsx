"use client";

import {
  Download,
  Heart,
  HelpCircle,
  LayoutGrid,
  Settings,
  ShoppingBag,
} from "lucide-react";
import { RoleSidebar } from "@/components/shared/role-sidebar";

const ACCOUNT_NAV_ITEMS = [
  { href: "/account", label: "Overview", icon: LayoutGrid },
  { href: "/account/purchases", label: "Purchases", icon: ShoppingBag },
  { href: "/account/library", label: "Library", icon: Download },
  { href: "/account/wishlist", label: "Wishlist", icon: Heart },
];

const ACCOUNT_FOOTER_ITEMS = [
  { href: "/account/settings", label: "Settings", icon: Settings },
  { href: "/account/help", label: "Help", icon: HelpCircle },
];

export function AccountSidebar() {
  return (
    <RoleSidebar
      footerItems={ACCOUNT_FOOTER_ITEMS}
      navItems={ACCOUNT_NAV_ITEMS}
      title="My Account"
      titleShort="U"
    />
  );
}
