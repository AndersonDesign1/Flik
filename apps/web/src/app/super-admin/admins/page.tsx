import { AuthAdminConsole } from "@/components/super-admin/auth-admin-console";

export default async function SuperAdminAdminsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-2xl text-foreground">
          Auth Administration
        </h2>
        <p className="text-muted-foreground text-sm">
          Manage platform users, roles, sessions, bans, passwords, and
          impersonation.
        </p>
      </div>

      <AuthAdminConsole />
    </div>
  );
}
