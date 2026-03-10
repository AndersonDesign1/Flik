import { redirect } from "next/navigation";
import { UnauthorizedView } from "@/components/admin/unauthorized-view";
import { DashboardShell } from "@/components/shared/dashboard-shell";
import { SuperAdminSidebar } from "@/components/super-admin/super-admin-sidebar";
import { fetchAuthQuery, isAuthenticated } from "@/lib/auth-server";
import { api } from "../../../convex/_generated/api";

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/login?redirect=/super-admin");
  }

  const user = await fetchAuthQuery(api.users.getCurrentUser);
  if (user && !user.emailVerified) {
    redirect(`/verify-email?email=${encodeURIComponent(user.email)}`);
  }

  const role = await fetchAuthQuery(api.profiles.getRole);
  if (role !== "super_admin") {
    return <UnauthorizedView isAuthenticated />;
  }

  return (
    <DashboardShell
      searchRole="super_admin"
      sidebar={<SuperAdminSidebar />}
      title="Super Admin"
    >
      {children}
    </DashboardShell>
  );
}
