import { CustomersContent } from "@/components/dashboard/customers/customers-content";
import { getCustomersData } from "@/lib/data";

export const revalidate = 60;

export default async function CustomersPage() {
  const data = await getCustomersData();

  return <CustomersContent data={data} />;
}
