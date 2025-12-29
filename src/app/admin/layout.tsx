import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { DashboardShell } from "@/components/shared/dashboard-shell";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell sidebar={<AdminSidebar />} title="Admin Panel">
      {children}
    </DashboardShell>
  );
}
