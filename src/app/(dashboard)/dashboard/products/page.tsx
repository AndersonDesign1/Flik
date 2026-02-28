import { ProductsContent } from "@/components/dashboard/products/products-content";
import { fetchAuthQuery } from "@/lib/auth-server";
import { api } from "../../../../../convex/_generated/api";

export const revalidate = 0;

export default async function ProductsPage() {
  const products = await fetchAuthQuery(api.products.listMyProducts);

  return (
    <ProductsContent
      products={products.map((product) => ({
        id: product._id,
        name: product.name,
        status: product.status,
        price: product.price,
        inventory: product.inventory,
        sales: product.sales,
        image: product.coverUrl ?? "",
      }))}
    />
  );
}
