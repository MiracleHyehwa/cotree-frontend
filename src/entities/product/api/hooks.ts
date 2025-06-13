import { InfiniteData, useSuspenseInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { productQueryOptions } from "./queryOptionts";
import { ProductListResponse } from "../model";

export const useProductsByCategory = (categoryId: string, displayMode: DisplayMode = "fallback") => {
  return useSuspenseInfiniteQuery<
    ProductListResponse,
    Error,
    InfiniteData<ProductListResponse>,
    (string | number)[],
    number
  >({
    queryKey: ["products", "byCategoryPage", categoryId],
    queryFn: ({ pageParam = 1 }) => {
      return productQueryOptions.getProductsByCategory(categoryId, pageParam, displayMode).queryFn();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? undefined : allPages.length + 1;
    },
    staleTime: 0,
    gcTime: 0,

    meta: { displayMode },
  });
};

export const useEcoProducts = (displayMode: DisplayMode = "fallback") => {
  return useSuspenseQuery<ProductListResponse>(productQueryOptions.getEcoProducts(displayMode));
};

export const useProductDetail = (id: string, displayMode: DisplayMode = "fallback") => {
  return useSuspenseQuery(productQueryOptions.getProductDetail(id, displayMode));
};
