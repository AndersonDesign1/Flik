import { ProductsContent } from "@/components/dashboard/products/products-content";
import { getViewerDashboardMode } from "@/lib/dashboard-mode";
import { getProductsData } from "@/lib/data";

export const revalidate = 60;

export default async function ProductsPage() {
  const dashboardMode = await getViewerDashboardMode();
  const data = await getProductsData(dashboardMode);

  return <ProductsContent products={data.products} />;
}
