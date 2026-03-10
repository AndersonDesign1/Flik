import { DashboardContent } from "@/components/dashboard/overview/dashboard-content";
import { getViewerDashboardMode } from "@/lib/dashboard-mode";
import { getDashboardData } from "@/lib/data";

// ISR: revalidate every 60 seconds
export const revalidate = 60;

export default async function DashboardPage() {
  const dashboardMode = await getViewerDashboardMode();
  const data = await getDashboardData(dashboardMode);

  return <DashboardContent data={data} />;
}
