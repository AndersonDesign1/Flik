import { PayoutsContent } from "@/components/dashboard/payouts/payouts-content";
import { getViewerDashboardMode } from "@/lib/dashboard-mode";
import { getPayoutsData } from "@/lib/data";

export const revalidate = 60;

export default async function PayoutsPage() {
  const dashboardMode = await getViewerDashboardMode();
  const data = await getPayoutsData(dashboardMode);

  return <PayoutsContent data={data} />;
}
