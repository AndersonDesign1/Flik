export const roleHierarchy = {
  user: 0,
  staff: 1,
  super_admin: 2,
} as const;

export type PlatformRole = keyof typeof roleHierarchy;

export function normalizeRole(role?: string | null): PlatformRole {
  if (role === "admin") {
    return "staff";
  }
  if (role === "staff" || role === "super_admin") {
    return role;
  }
  return "user";
}

export function getRoleLevel(role?: string): number {
  return roleHierarchy[normalizeRole(role)] ?? 0;
}

export function canManageUsers(role?: string): boolean {
  const normalizedRole = normalizeRole(role);
  return normalizedRole === "staff" || normalizedRole === "super_admin";
}
