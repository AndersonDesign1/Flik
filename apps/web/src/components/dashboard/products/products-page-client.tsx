"use client";

import { useQuery } from "convex/react";
import { useMemo, useState } from "react";
import { ProductsContent } from "@/components/dashboard/products/products-content";
import { api } from "../../../../convex/_generated/api";

const PRODUCTS_PAGE_SIZE = 20;

export function ProductsPageClient() {
  const [cursor, setCursor] = useState<string | null>(null);
  const [cursorStack, setCursorStack] = useState<Array<string | null>>([]);

  const productsResult = useQuery(api.products.listMyProducts, {
    paginationOpts: {
      cursor,
      numItems: PRODUCTS_PAGE_SIZE,
    },
  });

  const products = useMemo(
    () =>
      (productsResult?.page ?? []).map((product) => ({
        id: product._id,
        name: product.name,
        status: product.status,
        price: product.price,
        inventory: product.inventory,
        sales: product.sales,
        image: product.coverUrl ?? "",
      })),
    [productsResult]
  );

  const hasPrevious = cursorStack.length > 0;
  const hasNext = productsResult ? !productsResult.isDone : false;

  const handleNext = () => {
    if (!productsResult || productsResult.isDone) {
      return;
    }

    setCursorStack((prev) => [...prev, cursor]);
    setCursor(productsResult.continueCursor);
  };

  const handlePrevious = () => {
    setCursorStack((prev) => {
      const nextStack = [...prev];
      const previousCursor = nextStack.pop() ?? null;
      setCursor(previousCursor);
      return nextStack;
    });
  };

  return (
    <ProductsContent
      pagination={{
        hasPrevious,
        hasNext,
        onPrevious: handlePrevious,
        onNext: handleNext,
        isLoading: productsResult === undefined,
      }}
      products={products}
    />
  );
}
