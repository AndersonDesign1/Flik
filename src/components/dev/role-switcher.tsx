"use client";

import { Shield, Store, User, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const ROLES = [
  { name: "Admin", path: "/admin", icon: Shield, color: "text-red-600" },
  { name: "Staff", path: "/staff", icon: Users, color: "text-blue-600" },
  { name: "Seller", path: "/dashboard", icon: Store, color: "text-green-600" },
  { name: "User", path: "/account", icon: User, color: "text-purple-600" },
];

export function DevRoleSwitcher() {
  const pathname = usePathname();

  // Determine current role based on path
  const currentRole = ROLES.find((role) => pathname.startsWith(role.path));

  // Only show in development
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="h-12 w-12 rounded-full shadow-lg"
            size="icon"
            variant="outline"
          >
            {currentRole ? (
              <currentRole.icon className={cn("h-5 w-5", currentRole.color)} />
            ) : (
              <User className="h-5 w-5" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel className="text-xs">
            🔧 Dev Role Switcher
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {ROLES.map((role) => (
            <DropdownMenuItem asChild key={role.path}>
              <Link
                className={cn(
                  "flex cursor-pointer items-center gap-2",
                  pathname.startsWith(role.path) && "bg-gray-100"
                )}
                href={role.path}
              >
                <role.icon className={cn("h-4 w-4", role.color)} />
                <span>{role.name}</span>
                {pathname.startsWith(role.path) && (
                  <span className="ml-auto text-gray-400 text-xs">●</span>
                )}
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link className="flex cursor-pointer items-center gap-2" href="/">
              <span className="text-gray-500">← Back to Home</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
