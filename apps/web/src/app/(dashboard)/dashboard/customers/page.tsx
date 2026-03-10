import { CustomersContent } from "@/components/dashboard/customers/customers-content";
import { getViewerDashboardMode } from "@/lib/dashboard-mode";
import { getCustomersData } from "@/lib/data";

export const revalidate = 60;

export default async function CustomersPage() {
  const dashboardMode = await getViewerDashboardMode();
  const data = await getCustomersData(dashboardMode);

  return <CustomersContent data={data} />;
}
