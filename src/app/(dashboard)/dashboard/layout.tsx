import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardShell } from "@/components/shared/dashboard-shell";
import { fetchAuthQuery, isAuthenticated } from "@/lib/auth-server";
import { api } from "../../../../convex/_generated/api";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/login?redirect=/dashboard");
  }

  // Defense-in-depth: verify email is confirmed
  const user = await fetchAuthQuery(api.auth.getCurrentUser);
  if (user && !user.emailVerified) {
    redirect(`/verify-email?email=${encodeURIComponent(user.email)}`);
  }

  const profile = await fetchAuthQuery(api.profiles.getProfile);

  if (!profile?.onboardingCompleted) {
    redirect("/onboarding");
  }

  return (
    <DashboardShell
      searchRole="seller"
      sidebar={<DashboardSidebar />}
      title="Dashboard"
    >
      {children}
    </DashboardShell>
  );
}
