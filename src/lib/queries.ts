import { queryOptions } from "@tanstack/react-query";
import {
  listCategories,
  listProducts,
  getProductBySlug,
  searchProducts,
} from "./products.functions";

export type ProductFilters = {
  categorySlug?: string;
  featured?: boolean;
  flashSale?: boolean;
  isNew?: boolean;
  bestSeller?: boolean;
  limit?: number;
};

export const categoriesQuery = () =>
  queryOptions({
    queryKey: ["categories"],
    queryFn: () => listCategories(),
    staleTime: 5 * 60_000,
  });

export const productsQuery = (params: ProductFilters = {}) =>
  queryOptions({
    queryKey: ["products", params],
    queryFn: () => listProducts({ data: params }),
    staleTime: 60_000,
  });

export const productBySlugQuery = (slug: string) =>
  queryOptions({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug({ data: { slug } }),
    staleTime: 60_000,
  });

export const searchQuery = (q: string) =>
  queryOptions({
    queryKey: ["search", q],
    queryFn: () => searchProducts({ data: { q } }),
    enabled: q.trim().length > 0,
    staleTime: 30_000,
  });
