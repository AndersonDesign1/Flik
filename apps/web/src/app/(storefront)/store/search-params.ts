import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";

export const STORE_SORT_OPTIONS = [
  "featured",
  "newest",
  "best_selling",
  "price_asc",
  "price_desc",
] as const;

export const STORE_VIEW_OPTIONS = ["grid", "list"] as const;

export const storeSearchParamParsers = {
  search: parseAsString.withDefault(""),
  category: parseAsString.withDefault(""),
  tag: parseAsString.withDefault(""),
  sort: parseAsStringLiteral(STORE_SORT_OPTIONS).withDefault("featured"),
  page: parseAsInteger.withDefault(1),
  view: parseAsStringLiteral(STORE_VIEW_OPTIONS).withDefault("grid"),
};

export const storeSearchParamsCache =
  createSearchParamsCache(storeSearchParamParsers);

export type StoreSortOption = (typeof STORE_SORT_OPTIONS)[number];
export type StoreViewOption = (typeof STORE_VIEW_OPTIONS)[number];
