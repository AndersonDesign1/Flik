import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { UnauthorizedView } from "@/components/admin/unauthorized-view";
import { DashboardShell } from "@/components/shared/dashboard-shell";
import { fetchAuthQuery, isAuthenticated } from "@/lib/auth-server";
import { api } from "../../../convex/_generated/api";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side authentication check
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/login?redirect=/admin");
  }

  // Defense-in-depth: verify email is confirmed
  const user = await fetchAuthQuery(api.users.getCurrentUser);
  if (user && !user.emailVerified) {
    redirect(`/verify-email?email=${encodeURIComponent(user.email)}`);
  }

  // Server-side role check via Convex
  const role = await fetchAuthQuery(api.profiles.getRole);

  // Only admin role can access
  if (role !== "admin") {
    return <UnauthorizedView isAuthenticated />;
  }

  return (
    <DashboardShell
      searchRole="admin"
      sidebar={<AdminSidebar />}
      title="Admin Panel"
    >
      {children}
    </DashboardShell>
  );
}
