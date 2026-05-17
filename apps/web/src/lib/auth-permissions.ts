import { createAccessControl } from "better-auth/plugins/access";
import { adminAc } from "better-auth/plugins/admin/access";

export const flikAuthStatements = {
  user: [
    "create",
    "list",
    "set-role",
    "ban",
    "impersonate",
    "impersonate-admins",
    "delete",
    "set-password",
    "get",
    "update",
  ],
  session: ["list", "revoke", "delete"],
} as const;

export const flikAuthAccessControl = createAccessControl(flikAuthStatements);

export const flikAuthRoles = {
  user: flikAuthAccessControl.newRole({
    session: [],
    user: [],
  }),
  staff: flikAuthAccessControl.newRole({
    session: ["list", "revoke"],
    user: ["get", "list", "ban", "update"],
  }),
  super_admin: adminAc,
};

export const FLIK_AUTH_ADMIN_ROLES = ["staff", "super_admin"];
