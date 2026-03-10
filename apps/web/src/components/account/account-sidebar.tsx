"use client";

import { useQuery } from "convex/react";
import {
  BriefcaseBusiness,
  Compass,
  Download,
  Heart,
  HelpCircle,
  LayoutGrid,
  Settings,
  ShoppingBag,
} from "lucide-react";
import { RoleSidebar } from "@/components/shared/role-sidebar";
import { api } from "../../../convex/_generated/api";

const ACCOUNT_NAV_ITEMS = [
  { href: "/account", label: "Overview", icon: LayoutGrid },
  { href: "/account/discover", label: "Discover", icon: Compass },
  { href: "/account/purchases", label: "Purchases", icon: ShoppingBag },
  { href: "/account/library", label: "Library", icon: Download },
  { href: "/account/wishlist", label: "Wishlist", icon: Heart },
];

const ACCOUNT_FOOTER_ITEMS = [
  { href: "/account/settings", label: "Settings", icon: Settings },
  { href: "/account/help", label: "Help", icon: HelpCircle },
];

export function AccountSidebar() {
  const workspaceAccess = useQuery(api.platform.getWorkspaceAccess);

  const footerItems = [...ACCOUNT_FOOTER_ITEMS];
  footerItems.unshift(
    workspaceAccess?.canAccessSeller
      ? {
          href: "/dashboard",
          label: "Seller Workspace",
          icon: BriefcaseBusiness,
        }
      : {
          href: "/account/start-selling",
          label: "Start Selling",
          icon: BriefcaseBusiness,
        }
  );

  return (
    <RoleSidebar
      footerItems={footerItems}
      navItems={ACCOUNT_NAV_ITEMS}
      title="My Account"
      titleShort="U"
    />
  );
}
