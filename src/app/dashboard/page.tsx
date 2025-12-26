import { OverviewChart } from "@/components/dashboard/overview-chart";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, DollarSign, Users, CreditCard, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <h1 className="font-semibold text-2xl tracking-tight text-foreground">Overview</h1>
        <p className="text-muted-foreground text-sm">
          Welcome back, Josh. Here's what's happening today.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Revenue",
            value: "$45,231.89",
            trend: "+20.1%",
            subtext: "from last month"
          },
          {
            title: "Subscriptions",
            value: "+2350",
            trend: "+180.1%",
            subtext: "from last month"
          },
          {
            title: "Sales",
            value: "+12,234",
            trend: "+19%",
            subtext: "from last month"
          },
          {
            title: "Active Now",
            value: "+573",
            trend: "+201",
            subtext: "since last hour"
          }
        ].map((item) => (
             <div key={item.title} className="relative overflow-hidden rounded-xl bg-card p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_12px_0_rgba(0,0,0,0.02)] border border-transparent hover:border-border/40">
               <div className="flex items-center justify-between">
                 <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground/80">{item.title}</h3>
                 <span className={cn(
                    "flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                  )}>
                    {item.trend}
                 </span>
               </div>
               <div className="mt-4">
                 <div className="text-4xl font-bold tracking-tighter text-foreground tabular-nums">
                    {item.value}
                 </div>
                 <p className="mt-2 text-xs text-muted-foreground font-medium">
                    {item.subtext}
                 </p>
               </div>
             </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-7">
        <div className="col-span-1 lg:col-span-4 rounded-2xl bg-card p-8 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
          <div className="mb-8">
            <h3 className="font-semibold text-base text-foreground tracking-tight">Revenue Overview</h3>
            <p className="text-sm text-muted-foreground mt-1 font-medium">Monthly revenue performance for the current year.</p>
          </div>
          <OverviewChart />
        </div>
        <div className="col-span-1 lg:col-span-3 rounded-2xl bg-card p-8 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
            <div className="mb-8">
                <h3 className="font-semibold text-base text-foreground tracking-tight">Recent Sales</h3>
                <p className="text-sm text-muted-foreground mt-1 font-medium">Latest transactions from your store.</p>
            </div>
          <RecentSales />
        </div>
      </div>
    </div>
  );
}
