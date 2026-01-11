import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/shared/dashboard-shell";
import { StaffSidebar } from "@/components/staff/staff-sidebar";
import { UnauthorizedView } from "@/components/staff/unauthorized-view";
import { fetchAuthQuery, isAuthenticated } from "@/lib/auth-server";
import { api } from "../../../convex/_generated/api";

export default async function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side authentication check
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/login?redirect=/staff");
  }

  // Defense-in-depth: verify email is confirmed
  const user = await fetchAuthQuery(api.auth.getCurrentUser);
  if (user && !user.emailVerified) {
    redirect(`/verify-email?email=${encodeURIComponent(user.email)}`);
  }

  // Server-side role check via Convex
  const role = await fetchAuthQuery(api.profiles.getRole);

  // Staff and admin roles can access
  if (role !== "staff" && role !== "admin") {
    return <UnauthorizedView isAuthenticated />;
  }

  return (
    <DashboardShell
      searchRole="staff"
      sidebar={<StaffSidebar />}
      title="Staff Panel"
    >
      {children}
    </DashboardShell>
  );
}
