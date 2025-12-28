import { AnalyticsContent } from "@/components/dashboard/analytics/analytics-content";
import { getAnalyticsData } from "@/lib/data";

export const revalidate = 60;

export default async function AnalyticsPage() {
  const data = await getAnalyticsData();

  return <AnalyticsContent data={data} />;
}
