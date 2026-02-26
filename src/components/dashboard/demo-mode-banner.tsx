import type { DashboardDataMode } from "@/lib/dashboard-mode";

interface DemoModeBannerProps {
  mode: DashboardDataMode;
}

export function DemoModeBanner({ mode }: DemoModeBannerProps) {
  if (mode === "demo") {
    return (
      <div className="rounded-lg border border-primary-violet/20 bg-primary-violet-50 px-3 py-2 text-primary-violet-900 text-xs dark:border-primary-violet/30 dark:bg-primary-violet-50/10 dark:text-primary-violet-100">
        Demo workspace: this account shows seeded portfolio data.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-muted/40 px-3 py-2 text-muted-foreground text-xs">
      Live workspace: this account starts empty until you add products,
      customers, and transactions.
    </div>
  );
}
