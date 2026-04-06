import { StaffProductsTable } from "@/components/staff/staff-products-table";
import { fetchAuthQuery } from "@/lib/auth-server";
import { api } from "../../../../convex/_generated/api";

export default async function StaffProductsPage() {
  const products = await fetchAuthQuery(api.platform.listStaffProducts);

  return <StaffProductsTable products={products} />;
}
