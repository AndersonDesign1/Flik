import { OverviewChart } from "@/components/dashboard/overview-chart";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, DollarSign, Users, CreditCard, Activity } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="font-medium text-2xl tracking-tight">Overview</h1>
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
            icon: DollarSign,
          },
          {
            title: "Subscriptions",
            value: "+2350",
            trend: "+180.1%",
            icon: Users,
          },
          {
            title: "Sales",
            value: "+12,234",
            trend: "+19%",
            icon: CreditCard,
          },
          {
            title: "Active Now",
            value: "+573",
            trend: "+201",
            icon: Activity,
          },
        ].map((item) => (
          <div key={item.title} className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-6 transition-all hover:bg-muted/50">
            <div className="flex items-center justify-between">
              <span className="font-medium text-muted-foreground text-sm">{item.title}</span>
              <item.icon className="h-4 w-4 text-muted-foreground/50 transition-colors group-hover:text-foreground" />
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-semibold text-2xl tracking-tight">{item.value}</span>
              <span className="flex items-center text-xs text-emerald-500 font-medium">
                 {item.trend}
                 <ArrowUpRight className="ml-0.5 h-3 w-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Chart Section */}
        <div className="col-span-1 min-h-[400px] rounded-xl border border-border/50 bg-card p-6 lg:col-span-4">
           <div className="mb-6 flex items-center justify-between">
            <h3 className="font-medium text-sm">Revenue Over Time</h3>
            <select className="bg-transparent text-xs text-muted-foreground outline-none">
                <option>Monthly</option>
                <option>Weekly</option>
            </select>
           </div>
           <OverviewChart />
        </div>

        {/* Recent Sales Section */}
        <div className="col-span-1 rounded-xl border border-border/50 bg-card p-6 lg:col-span-3">
           <div className="mb-6">
            <h3 className="font-medium text-sm">Recent Sales</h3>
            <p className="text-muted-foreground text-xs">You made 265 sales this month.</p>
           </div>
          <RecentSales />
        </div>
      </div>
    </div>
  );
}
