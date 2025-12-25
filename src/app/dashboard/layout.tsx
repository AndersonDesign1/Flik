import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground selection:bg-primary/10 selection:text-primary">
      {/* Desktop Sidebar */}
      <div className="hidden border-border border-r md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex min-h-screen flex-1 flex-col">
        <div className="mx-auto w-full max-w-7xl flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
