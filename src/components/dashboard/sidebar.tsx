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
        "flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border/50",
        className
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center px-6">
        <Link
          className="flex items-center gap-2.5 font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
          href="/"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-foreground text-background shadow-sm">
            <span className="text-[10px] font-bold">A</span>
          </div>
          <span className="text-sm">Platform</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              className={cn(
                "group relative flex items-center gap-3 rounded-md px-3 py-2.5 font-medium text-sm outline-none ring-sidebar-ring transition-all hover:bg-sidebar-accent/50 focus-visible:ring-2",
                isActive ? "text-sidebar-accent-foreground" : "text-muted-foreground hover:text-foreground"
              )}
              href={item.href}
              key={item.href}
            >
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-md bg-sidebar-accent border border-sidebar-border/50 shadow-sm"
                  layoutId="sidebar-active"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className={cn("relative z-10 h-4 w-4 shrink-0 transition-colors", isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground")} />
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / User */}
      <div className="border-t border-sidebar-border/50 p-4">
        <div className="flex items-center gap-3 rounded-lg border border-transparent px-2 py-2 transition-colors hover:bg-sidebar-accent/50 cursor-pointer">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted border border-border/50 font-medium text-[10px] text-muted-foreground shadow-sm">
            JS
            </div>
            <div className="flex flex-col gap-0.5 text-xs">
            <span className="font-medium text-foreground">Josh Anderson</span>
            <span className="text-muted-foreground">josh@example.com</span>
            </div>
        </div>
      </div>
    </aside>
  );
}
