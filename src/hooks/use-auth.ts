"use client";

import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { api } from "../../convex/_generated/api";

type Role = "user" | "staff" | "admin";

export function useSession() {
  const [session, setSession] = useState<{
    user: {
      id: string;
      name: string;
      email: string;
      image?: string | null;
    } | null;
    isLoading: boolean;
  }>({ user: null, isLoading: true });

  useEffect(() => {
    authClient.getSession().then((result) => {
      setSession({
        user: result.data?.user ?? null,
        isLoading: false,
      });
    });
  }, []);

  return session;
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
