import { ProductsContent } from "@/components/dashboard/products/products-content";
import { fetchAuthQuery } from "@/lib/auth-server";
import { api } from "../../../../../convex/_generated/api";

export const revalidate = 0;

const PRODUCTS_PAGE_SIZE = 50;

export default async function ProductsPage() {
  const productsResult = await fetchAuthQuery(api.products.listMyProducts, {
    paginationOpts: {
      cursor: null,
      numItems: PRODUCTS_PAGE_SIZE,
    },
  });

  return (
    <ProductsContent
      products={productsResult.page.map((product) => ({
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
