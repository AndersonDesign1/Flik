import { StaffSellersTable } from "@/components/staff/staff-sellers-table";
import { fetchAuthQuery } from "@/lib/auth-server";
import { api } from "../../../../convex/_generated/api";

export default async function StaffSellersPage() {
  const sellers = await fetchAuthQuery(api.platform.listSellerPerformance);

  return <StaffSellersTable sellers={sellers} />;
}
