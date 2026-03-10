import type { VariantProps } from "class-variance-authority";
import type { badgeVariants } from "@/components/ui/badge";

export type Role = "user" | "staff" | "admin" | "super_admin";

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>;

interface RolePresentation {
  label: string;
  badgeVariant: BadgeVariant;
  shortLabel: string;
}

const ROLE_PRESENTATION: Record<Role, RolePresentation> = {
  user: {
    label: "User",
    badgeVariant: "secondary",
    shortLabel: "User",
  },
  staff: {
    label: "Staff",
    badgeVariant: "accent",
    shortLabel: "Staff",
  },
  admin: {
    label: "Admin",
    badgeVariant: "warning",
    shortLabel: "Admin",
  },
  super_admin: {
    label: "Super Admin",
    badgeVariant: "default",
    shortLabel: "Super",
  },
};

export function getRolePresentation(role: Role): RolePresentation {
  return ROLE_PRESENTATION[role];
}
