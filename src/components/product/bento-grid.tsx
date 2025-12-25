import type { Product } from "@/lib/mock-data";
import { ProductCard } from "./product-card";

interface BentoGridProps {
  products: Product[];
}

export function BentoGrid({ products }: BentoGridProps) {
  return (
    <div className="grid grid-flow-row-dense auto-rows-[minmax(300px,auto)] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <ProductCard index={index} key={product.id} product={product} />
      ))}
    </div>
  );
}
