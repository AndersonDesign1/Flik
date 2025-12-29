import { AccountSidebar } from "@/components/account/account-sidebar";
import { DashboardShell } from "@/components/shared/dashboard-shell";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell sidebar={<AccountSidebar />} title="My Account">
      {children}
    </DashboardShell>
  );
}
