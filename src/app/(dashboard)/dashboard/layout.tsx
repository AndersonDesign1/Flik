import { redirect } from "next/navigation";
import { DashboardModeProvider } from "@/components/dashboard/dashboard-mode-context";
import { DemoModeBanner } from "@/components/dashboard/demo-mode-banner";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardShell } from "@/components/shared/dashboard-shell";
import { fetchAuthQuery, isAuthenticated } from "@/lib/auth-server";
import { getViewerDashboardMode } from "@/lib/dashboard-mode";
import { canAccessSellerWorkspace } from "@/lib/workspaces";
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
  const user = await fetchAuthQuery(api.users.getCurrentUser);
  if (user && !user.emailVerified) {
    redirect(`/verify-email?email=${encodeURIComponent(user.email)}`);
  }

  const profile = await fetchAuthQuery(api.profiles.getProfile);

  if (!profile?.onboardingCompleted) {
    redirect("/onboarding");
  }

  if (!canAccessSellerWorkspace(profile.userType)) {
    redirect("/account/start-selling");
  }

  const dashboardMode = await getViewerDashboardMode();

  return (
    <DashboardShell
      searchRole="seller"
      sidebar={<DashboardSidebar />}
      title="Dashboard"
    >
      <div className="space-y-4">
        <DemoModeBanner mode={dashboardMode} />
        <DashboardModeProvider mode={dashboardMode}>
          {children}
        </DashboardModeProvider>
      </div>
    </DashboardShell>
  );
}
