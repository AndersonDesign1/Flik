import { redirect } from "next/navigation";
import { AccountSidebar } from "@/components/account/account-sidebar";
import { DashboardShell } from "@/components/shared/dashboard-shell";
import { fetchAuthQuery, isAuthenticated } from "@/lib/auth-server";
import { api } from "../../../convex/_generated/api";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side authentication check
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/login?redirect=/account");
  }

  // Defense-in-depth: verify email is confirmed
  const user = await fetchAuthQuery(api.auth.getCurrentUser);
  if (user && !user.emailVerified) {
    redirect(`/verify-email?email=${encodeURIComponent(user.email)}`);
  }

  return (
    <DashboardShell
      searchRole="user"
      sidebar={<AccountSidebar />}
      title="My Account"
    >
      {children}
    </DashboardShell>
  );
}
