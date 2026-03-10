"use client";

import { useQuery } from "convex/react";
import {
  BriefcaseBusiness,
  LogOut,
  Settings,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentRole, useSession } from "@/hooks/use-auth";
import { authClient } from "@/lib/auth-client";
import { getRolePresentation } from "@/lib/roles";
import { api } from "../../../convex/_generated/api";

function getInitials(name?: string | null): string {
  if (!name) {
    return "U";
  }

  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function ProfileMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { user, isLoading } = useSession();
  const { role, isLoading: isRoleLoading } = useCurrentRole();
  const workspaceAccess = useQuery(
    api.platform.getWorkspaceAccess,
    user ? {} : "skip"
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  if (isLoading || !isMounted) {
    return <div className="size-8 animate-pulse rounded-full bg-muted" />;
  }

  if (!user) {
    return null;
  }

  const initials = getInitials(user.name);
  const rolePresentation = getRolePresentation(role);
  const settingsHref = pathname.startsWith("/dashboard")
    ? "/dashboard/settings"
    : "/account/settings";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          className="relative flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-primary-violet to-secondary-magenta font-semibold text-white text-xs ring-offset-background transition-all hover:ring-2 hover:ring-ring hover:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          type="button"
        >
          <Avatar className="size-8">
            <AvatarImage
              alt={user.name ?? "Unnamed User"}
              src={user.image ?? undefined}
            />
            <AvatarFallback className="bg-gradient-to-br from-primary-violet to-secondary-magenta text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="sr-only">Open user menu</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <p className="font-medium text-sm leading-none">
                {user.name ?? "Unnamed User"}
              </p>
              {!isRoleLoading && (
                <Badge
                  className="rounded-full px-2 py-0 text-[10px] uppercase tracking-[0.14em]"
                  variant={rolePresentation.badgeVariant}
                >
                  {rolePresentation.shortLabel}
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground text-xs leading-none">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer gap-2">
          <Link href="/account">
            <ShoppingBag className="size-4" />
            Buyer Workspace
          </Link>
        </DropdownMenuItem>
        {workspaceAccess?.canAccessSeller && (
          <DropdownMenuItem asChild className="cursor-pointer gap-2">
            <Link href="/dashboard">
              <BriefcaseBusiness className="size-4" />
              Seller Workspace
            </Link>
          </DropdownMenuItem>
        )}
        {workspaceAccess?.canAccessStaff && (
          <DropdownMenuItem asChild className="cursor-pointer gap-2">
            <Link href="/staff">
              <Users className="size-4" />
              Staff Panel
            </Link>
          </DropdownMenuItem>
        )}
        {workspaceAccess?.canAccessAdmin && (
          <DropdownMenuItem asChild className="cursor-pointer gap-2">
            <Link href="/admin">
              <Shield className="size-4" />
              Admin Panel
            </Link>
          </DropdownMenuItem>
        )}
        {workspaceAccess?.canAccessSuperAdmin && (
          <DropdownMenuItem asChild className="cursor-pointer gap-2">
            <Link href="/super-admin">
              <ShieldCheck className="size-4" />
              Super Admin
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer gap-2">
          <Link href={settingsHref}>
            <Settings className="size-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer gap-2 text-destructive-600 focus:text-destructive-600 dark:text-destructive-500"
          onClick={handleLogout}
        >
          <LogOut className="size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
