import { AnalyticsContent } from "@/components/dashboard/analytics/analytics-content";
import { getViewerDashboardMode } from "@/lib/dashboard-mode";
import { getAnalyticsData } from "@/lib/data";

export const revalidate = 60;

export default async function AnalyticsPage() {
  const dashboardMode = await getViewerDashboardMode();
  const data = await getAnalyticsData(dashboardMode);

  return <AnalyticsContent data={data} />;
}
