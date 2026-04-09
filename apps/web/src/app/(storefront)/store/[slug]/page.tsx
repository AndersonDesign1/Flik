import { fetchQuery } from "convex/nextjs";
import { notFound } from "next/navigation";
import { StorePageClient } from "@/components/storefront/store-page-client";
import { api } from "../../../../../convex/_generated/api";
import { storeSearchParamsCache } from "../search-params";

interface StorePageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function StorePage({
  params,
  searchParams,
}: StorePageProps) {
  const { slug } = await params;
  const parsedSearchParams = await storeSearchParamsCache.parse(await searchParams);

  const store = await fetchQuery(api.stores.getStoreBySlug, {
    slug,
    search: parsedSearchParams.search || undefined,
    category: parsedSearchParams.category || undefined,
    tag: parsedSearchParams.tag || undefined,
    sort: parsedSearchParams.sort,
    page: parsedSearchParams.page,
    pageSize: 12,
  });

  if (!store) {
    notFound();
  }

  return (
    <StorePageClient
      availableCategories={store.availableCategories}
      availableTags={store.availableTags}
      description={store.description}
      initialQueryState={parsedSearchParams}
      ownerName={store.ownerName}
      page={store.page}
      pageCount={store.pageCount}
      productCount={store.productCount}
      products={store.products}
      storeName={store.name}
      total={store.total}
      totalSales={store.totalSales}
    />
  );
}
