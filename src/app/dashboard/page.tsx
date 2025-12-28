import { DashboardContent } from "@/components/dashboard/overview/dashboard-content";
import { getDashboardData } from "@/lib/data";

// ISR: revalidate every 60 seconds
export const revalidate = 60;

export default async function DashboardPage() {
  const data = await getDashboardData();

  return <DashboardContent data={data} />;
}
