"use client";

import {
  BarChart3,
  Box,
  CreditCard,
  LayoutGrid,
  Settings,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutGrid },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/products", label: "Products", icon: Box },
  { href: "/dashboard/customers", label: "Customers", icon: Users },
  { href: "/dashboard/payouts", label: "Payouts", icon: CreditCard },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-screen w-64 flex-col border-border border-r bg-sidebar text-sidebar-foreground",
        className
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center border-border border-b px-6">
        <Link
          className="flex items-center gap-2 font-bold tracking-tight"
          href="/"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-foreground text-background">
            <span className="text-xs">A</span>
          </div>
          <span>Platform</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 p-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              className={cn(
                "group relative flex items-center gap-3 rounded-md px-3 py-2 font-medium text-sm transition-colors hover:text-foreground",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
              href={item.href}
              key={item.href}
            >
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-md bg-sidebar-accent"
                  layoutId="sidebar-active"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className="relative z-10 h-4 w-4" />
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / User */}
      <div className="flex items-center gap-3 border-border border-t p-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-muted font-medium text-xs">
          JS
        </div>
        <div className="flex flex-col text-xs">
          <span className="font-medium">Josh Anderson</span>
          <span className="text-muted-foreground">josh@example.com</span>
        </div>
      </div>
    </aside>
  );
}
