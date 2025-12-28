import { PayoutsContent } from "@/components/dashboard/payouts/payouts-content";
import { getPayoutsData } from "@/lib/data";

export const revalidate = 60;

export default async function PayoutsPage() {
  const data = await getPayoutsData();

  return <PayoutsContent data={data} />;
}
