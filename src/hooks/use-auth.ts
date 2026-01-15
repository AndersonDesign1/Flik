"use client";

import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { authClient } from "@/lib/auth-client";
import { api } from "../../convex/_generated/api";

type Role = "user" | "staff" | "admin";

/**
 * Session hook using Better Auth's built-in nanostore caching.
 * This eliminates redundant API calls across components.
 * Tracks hydration to prevent showing loading state on tab refocus.
 */
export function useSession() {
  const { data, isPending } = authClient.useSession();
  const hasHydratedRef = useRef(false);

  // Once we get data (or confirm no session), mark as hydrated
  if (!(isPending || hasHydratedRef.current)) {
    hasHydratedRef.current = true;
  }

  return {
    user: data?.user ?? null,
    // Only show loading on initial mount, not on refocus
    isLoading: isPending && !hasHydratedRef.current,
  };
}

export function useRequireAuth(redirectTo = "/login") {
  const router = useRouter();
  const { user, isLoading } = useSession();

  useEffect(() => {
    if (!(isLoading || user)) {
      router.push(redirectTo);
    }
  }, [isLoading, user, router, redirectTo]);

  return { user, isLoading, isAuthenticated: !!user };
}

export function useRequireRole(requiredRole: Role | Role[]) {
  const { user, isLoading: sessionLoading } = useSession();
  const roleData = useQuery(api.profiles.getRole);
  const isLoadingRole = roleData === undefined;
  const currentRole = (roleData ?? "user") as Role;

  const allowedRoles = Array.isArray(requiredRole)
    ? requiredRole
    : [requiredRole];

  const hasAccess =
    allowedRoles.includes(currentRole) ||
    (allowedRoles.includes("staff") && currentRole === "admin");

  return {
    user,
    role: currentRole,
    isLoading: sessionLoading || isLoadingRole,
    hasAccess,
  };
}
