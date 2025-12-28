import { ProductsContent } from "@/components/dashboard/products/products-content";
import { getProductsData } from "@/lib/data";

export const revalidate = 60;

export default async function ProductsPage() {
  const data = await getProductsData();

  return <ProductsContent products={data.products} />;
}
