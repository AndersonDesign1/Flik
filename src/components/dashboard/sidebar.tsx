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
        "flex h-screen w-64 flex-col bg-background text-foreground", // Removed border-r, used bg-background
        className
      )}
    >
      {/* Header */}
      <div className="flex h-14 items-center px-4">
        <Link
          className="flex items-center gap-2 font-medium tracking-tight text-sm text-muted-foreground hover:text-foreground transition-colors"
          href="/"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-foreground/10 text-foreground">
            <span className="text-[10px] font-bold">A</span>
          </div>
          <span>Platform</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 p-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              className={cn(
                "group relative flex items-center gap-2.5 rounded-sm px-2.5 py-1.5 font-medium text-sm outline-none ring-sidebar-ring transition-all hover:bg-sidebar-accent/50 focus-visible:ring-2",
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
              href={item.href}
              key={item.href}
            >
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-sm bg-sidebar-accent"
                  layoutId="sidebar-active"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <item.icon className="relative z-10 h-4 w-4 shrink-0 transition-transform duration-200 group-active:scale-95" />
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / User */}
      <div className="flex items-center gap-3 p-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted font-medium text-[10px] text-muted-foreground">
          JS
        </div>
        <div className="flex flex-col text-xs">
          <span className="font-medium text-foreground">Josh Anderson</span>
          <span className="text-muted-foreground">josh@example.com</span>
        </div>
      </div>
    </aside>
  );
}
