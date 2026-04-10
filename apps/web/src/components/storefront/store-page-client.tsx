"use client";

import { Grid3X3, LayoutList, Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { useQueryStates } from "nuqs";
import {
  STORE_SORT_OPTIONS,
  storeSearchParamParsers,
  type StoreSortOption,
  type StoreViewOption,
} from "@/app/(storefront)/store/search-params";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface StoreProductCard {
  _id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  coverUrl?: string;
  category: string;
  tags: string[];
  sales: number;
}

interface StorePageClientProps {
  storeName: string;
  ownerName: string;
  description?: string;
  productCount: number;
  totalSales: number;
  total: number;
  page: number;
  pageCount: number;
  availableCategories: string[];
  availableTags: string[];
  products: StoreProductCard[];
  initialQueryState: {
    search: string;
    category: string;
    tag: string;
    sort: StoreSortOption;
    page: number;
    view: StoreViewOption;
  };
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function getCategoryLabel(category: string) {
  const labels: Record<string, string> = {
    templates: "Templates",
    courses: "Courses",
    ebooks: "eBooks",
    software: "Software",
    design: "Design Assets",
    other: "Other",
  };

  return labels[category] ?? category;
}

function getInitials(name: string) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return initials || "ST";
}

export function StorePageClient({
  storeName,
  ownerName,
  description,
  productCount,
  totalSales,
  total,
  page,
  pageCount,
  availableCategories,
  availableTags,
  products,
  initialQueryState,
}: StorePageClientProps) {
  const [queryState, setQueryState] = useQueryStates(storeSearchParamParsers, {
    history: "replace",
    shallow: false,
  });

  const state = useMemo(
    () => ({
      search: queryState.search ?? initialQueryState.search,
      category: queryState.category ?? initialQueryState.category,
      tag: queryState.tag ?? initialQueryState.tag,
      sort: queryState.sort ?? initialQueryState.sort,
      page: queryState.page ?? initialQueryState.page,
      view: queryState.view ?? initialQueryState.view,
    }),
    [initialQueryState, queryState]
  );

  const activeFilterCount = [
    state.search,
    state.category,
    state.tag,
    state.sort !== "featured" ? state.sort : "",
  ].filter(Boolean).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          className="inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
          href="/"
        >
          Back to marketplace
        </Link>
      </div>

      <section className="relative overflow-hidden rounded-[32px] border border-border bg-card px-6 py-8 shadow-sm sm:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.12),transparent_28%)]" />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-primary-violet font-semibold text-2xl text-white shadow-sm">
              {getInitials(storeName)}
            </div>
            <p className="mb-2 text-primary-violet text-xs uppercase tracking-[0.22em]">
              Seller storefront
            </p>
            <h1 className="font-bold text-4xl text-foreground tracking-tight sm:text-5xl">
              {storeName}
            </h1>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
              {description?.trim() || `${ownerName} is selling digital products on Flik.`}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">Managed by {ownerName}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/70 bg-background/80 px-4 py-4">
              <p className="text-muted-foreground text-xs uppercase tracking-[0.14em]">
                Live products
              </p>
              <p className="mt-2 font-semibold text-2xl text-foreground">{productCount}</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/80 px-4 py-4">
              <p className="text-muted-foreground text-xs uppercase tracking-[0.14em]">
                Total sales
              </p>
              <p className="mt-2 font-semibold text-2xl text-foreground">
                {totalSales.toLocaleString()}
              </p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/80 px-4 py-4">
              <p className="text-muted-foreground text-xs uppercase tracking-[0.14em]">
                Matching now
              </p>
              <p className="mt-2 font-semibold text-2xl text-foreground">{total}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[28px] border border-border bg-card p-5 sm:p-6">
        <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative w-full xl:max-w-md">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="h-11 rounded-full pl-10"
              onChange={(event) => {
                setQueryState({
                  search: event.target.value,
                  page: 1,
                }).catch(() => undefined);
              }}
              placeholder="Search this store"
              value={state.search}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {activeFilterCount === 0
                  ? "All products"
                  : `${activeFilterCount} filter${activeFilterCount === 1 ? "" : "s"} active`}
              </span>
            </div>

            <div className="inline-flex rounded-full border border-border p-1">
              <Button
                aria-label="Grid view"
                className="rounded-full"
                onClick={() => {
                  setQueryState({ view: "grid" }).catch(() => undefined);
                }}
                size="sm"
                type="button"
                variant={state.view === "grid" ? "default" : "ghost"}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                aria-label="List view"
                className="rounded-full"
                onClick={() => {
                  setQueryState({ view: "list" }).catch(() => undefined);
                }}
                size="sm"
                type="button"
                variant={state.view === "list" ? "default" : "ghost"}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-[1fr_1fr_220px_220px]">
          <select
            aria-label="Filter by category"
            className="h-11 rounded-2xl border border-border bg-background px-4 text-sm"
            onChange={(event) => {
              setQueryState({
                category: event.target.value,
                page: 1,
              }).catch(() => undefined);
            }}
            value={state.category}
          >
            <option value="">All categories</option>
            {availableCategories.map((category) => (
              <option key={category} value={category}>
                {getCategoryLabel(category)}
              </option>
            ))}
          </select>

          <select
            aria-label="Filter by tag"
            className="h-11 rounded-2xl border border-border bg-background px-4 text-sm"
            onChange={(event) => {
              setQueryState({
                tag: event.target.value,
                page: 1,
              }).catch(() => undefined);
            }}
            value={state.tag}
          >
            <option value="">All tags</option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>

          <select
            aria-label="Sort products"
            className="h-11 rounded-2xl border border-border bg-background px-4 text-sm"
            onChange={(event) => {
              setQueryState({
                sort: event.target.value as StoreSortOption,
                page: 1,
              }).catch(() => undefined);
            }}
            value={state.sort}
          >
            {STORE_SORT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {{
                  featured: "Featured",
                  newest: "Newest",
                  best_selling: "Best selling",
                  price_asc: "Price: Low to high",
                  price_desc: "Price: High to low",
                }[option]}
              </option>
            ))}
          </select>

          <Button
            className="h-11 rounded-2xl"
            onClick={() => {
              setQueryState({
                search: "",
                category: "",
                tag: "",
                sort: "featured",
                page: 1,
                view: "grid",
              }).catch(() => undefined);
            }}
            type="button"
            variant="outline"
          >
            Clear filters
          </Button>
        </div>
      </section>

      <section className="mt-8">
        {products.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-border bg-card px-6 py-16 text-center">
            <h2 className="font-semibold text-2xl text-foreground">
              {productCount === 0
                ? "This store has no active products yet"
                : "No products match your current filters"}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              {productCount === 0
                ? "Check back soon for new releases from this seller."
                : "Try clearing one of your filters or broadening your search to see more of the catalog."}
            </p>
          </div>
        ) : state.view === "list" ? (
          <div className="space-y-4">
            {products.map((product) => {
              const hasDiscount =
                product.compareAtPrice !== undefined &&
                product.compareAtPrice > product.price;

              return (
                <Link
                  className="group flex flex-col gap-5 rounded-[28px] border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary-violet/25 hover:shadow-lg hover:shadow-primary-violet/10 sm:flex-row"
                  href={`/products/${product.slug}`}
                  key={product._id}
                >
                  <div className="sm:w-64">
                    <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                      {product.coverUrl ? (
                        <img
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          src={product.coverUrl}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary-violet-100 via-background to-accent-teal/10 text-muted-foreground">
                          <span className="text-5xl">{getInitials(product.name)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between gap-4">
                    <div>
                      <div className="mb-2 flex flex-wrap items-center gap-2 text-sm">
                        <span className="rounded-full border border-primary-violet/20 bg-primary-violet-100 px-2.5 py-1 text-primary-violet-700">
                          {getCategoryLabel(product.category)}
                        </span>
                        <span className="text-muted-foreground">
                          {product.sales.toLocaleString()} sales
                        </span>
                      </div>
                      <h2 className="font-semibold text-2xl text-foreground transition-colors group-hover:text-primary-violet">
                        {product.name}
                      </h2>
                      {product.tags.length > 0 ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {product.tags.slice(0, 4).map((tag) => (
                            <span
                              className="rounded-full bg-muted px-3 py-1 text-muted-foreground text-xs"
                              key={tag}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-end gap-3">
                        <span className="font-semibold text-3xl text-foreground">
                          {formatCurrency(product.price)}
                        </span>
                        {hasDiscount ? (
                          <span className="pb-1 text-muted-foreground line-through">
                            {formatCurrency(product.compareAtPrice as number)}
                          </span>
                        ) : null}
                      </div>
                      <Button className="rounded-full">View product</Button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => {
              const hasDiscount =
                product.compareAtPrice !== undefined &&
                product.compareAtPrice > product.price;

              return (
                  <Link href={`/products/${product.slug}`} key={product._id}>
                  <article className="group h-full overflow-hidden rounded-[28px] border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary-violet/25 hover:shadow-lg hover:shadow-primary-violet/10">
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      {product.coverUrl ? (
                        <img
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                          src={product.coverUrl}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary-violet-100 via-background to-accent-teal/10 text-muted-foreground">
                          <span className="text-5xl">{getInitials(product.name)}</span>
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
                        <span className="rounded-full border border-primary-violet/20 bg-primary-violet-100 px-2.5 py-1 text-primary-violet-700">
                          {getCategoryLabel(product.category)}
                        </span>
                        <span className="text-muted-foreground">
                          {product.sales.toLocaleString()} sales
                        </span>
                      </div>

                      <h2 className="font-semibold text-xl text-foreground transition-colors group-hover:text-primary-violet">
                        {product.name}
                      </h2>

                      {product.tags.length > 0 ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {product.tags.slice(0, 3).map((tag) => (
                            <span
                              className="rounded-full bg-muted px-3 py-1 text-muted-foreground text-xs"
                              key={tag}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}

                      <div className="mt-5 flex items-end justify-between gap-4">
                        <div className="flex items-end gap-2">
                          <span className="font-semibold text-2xl text-foreground">
                            {formatCurrency(product.price)}
                          </span>
                          {hasDiscount ? (
                            <span className="pb-0.5 text-muted-foreground text-sm line-through">
                              {formatCurrency(product.compareAtPrice as number)}
                            </span>
                          ) : null}
                        </div>
                        <Button className="rounded-full" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {pageCount > 1 ? (
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground text-sm">
            Page {page} of {pageCount}
          </p>
          <div className="flex items-center gap-3">
            <Button
              disabled={page <= 1}
              onClick={() => {
                setQueryState({ page: Math.max(1, page - 1) }).catch(
                  () => undefined
                );
              }}
              type="button"
              variant="outline"
            >
              Previous
            </Button>
            <Button
              disabled={page >= pageCount}
              onClick={() => {
                setQueryState({ page: Math.min(pageCount, page + 1) }).catch(
                  () => undefined
                );
              }}
              type="button"
            >
              Next
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
