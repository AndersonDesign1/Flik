import { AnalyticsChart } from "@/components/dashboard/analytics/analytics-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="font-bold text-3xl tracking-tight">Analytics</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* KPI Cards could go here reusing the ones from overview if needed, or specific ones */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Unique Visitors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">24,300</div>
            <p className="text-muted-foreground text-xs">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Bounce Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">42.3%</div>
            <p className="text-muted-foreground text-xs">-2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Avg. Session Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">4m 12s</div>
            <p className="text-muted-foreground text-xs">
              +30s from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">3.2%</div>
            <p className="text-muted-foreground text-xs">
              +0.4% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <AnalyticsChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
