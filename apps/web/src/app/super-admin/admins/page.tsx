import { Card } from "@/components/ui/card";
import { fetchAuthQuery } from "@/lib/auth-server";
import { api } from "../../../../convex/_generated/api";

export default async function SuperAdminAdminsPage() {
  const admins = await fetchAuthQuery(api.platform.listAdminRoster);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-2xl text-foreground">
          Admins and Staff
        </h2>
        <p className="text-muted-foreground text-sm">
          Internal access roster for the platform team.
        </p>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="grid grid-cols-[2fr_2fr_1fr] border-border/30 border-b px-6 py-3 font-medium text-muted-foreground text-xs uppercase tracking-[0.14em]">
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
        </div>
        {admins.map((admin) => (
          <div
            className="grid grid-cols-[2fr_2fr_1fr] border-border/20 border-b px-6 py-4 last:border-b-0"
            key={`${admin.email}-${admin.role}`}
          >
            <span className="font-medium text-foreground text-sm">
              {admin.name}
            </span>
            <span className="text-muted-foreground text-sm">{admin.email}</span>
            <span className="text-foreground text-sm capitalize">
              {admin.role.replace("_", " ")}
            </span>
          </div>
        ))}
      </Card>
    </div>
  );
}
