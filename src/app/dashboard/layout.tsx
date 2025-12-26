import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Desktop Sidebar */}
      <div className="hidden w-64 shrink-0 md:block">
        <Sidebar className="fixed left-0 top-0 hidden h-full w-64 md:flex" />
      </div>

      {/* Main Content */}
      <main className="flex min-h-screen flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8 lg:p-12">
           <div className="mx-auto max-w-6xl space-y-12">
            {children}
           </div>
        </div>
      </main>
    </div>
  );
}
