import { AnalyticsChart } from "@/components/dashboard/analytics/analytics-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="font-medium text-2xl tracking-tight">Analytics</h1>
        <p className="text-muted-foreground text-sm">
          Detailed metrics and performance data.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
             title: "Unique Visitors",
             value: "24,300",
             trend: "+12%",
          },
          {
             title: "Bounce Rate",
             value: "42.3%",
             trend: "-2%",
             downIsGood: true,
          },
          {
             title: "Avg. Session Duration",
             value: "4m 12s",
             trend: "+30s",
          },
          {
             title: "Conversion Rate",
             value: "3.2%",
             trend: "+0.4%",
          }
        ].map((item) => (
             <div key={item.title} className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-6 transition-all hover:bg-muted/50">
               <div className="flex items-center justify-between">
                 <span className="font-medium text-muted-foreground text-sm">{item.title}</span>
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

      <div className="grid grid-cols-1 gap-6">
        <div className="col-span-1 rounded-xl border border-border/50 bg-card p-6">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-medium text-sm">Traffic Overview</h3>
          </div>
          <AnalyticsChart />
        </div>
      </div>
    </div>
  );
}
