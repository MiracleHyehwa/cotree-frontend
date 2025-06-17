import { InfiniteData, useSuspenseInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { productKeys, productQueryOptions } from "./queryOptionts";
import { GetSearchedProductsParams, ProductListResponse } from "../model";

export const useProductsByCategory = (categoryId: string, displayMode: DisplayMode = "fallback") => {
  return useSuspenseInfiniteQuery<
    ProductListResponse,
    Error,
    InfiniteData<ProductListResponse>,
    (string | number)[],
    number
  >({
    queryKey: productKeys.getProductsByCategoryPage(categoryId),
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

export const useTodayProducts = (displayMode: DisplayMode = "fallback") => {
  return useSuspenseQuery<ProductListResponse>(productQueryOptions.getTodayProducts(displayMode));
};

export const useEcoProducts = (displayMode: DisplayMode = "fallback") => {
  return useSuspenseQuery<ProductListResponse>(productQueryOptions.getEcoProducts(displayMode));
};

export const useEcoProductByPage = (displayMode: DisplayMode = "fallback") => {
  return useSuspenseInfiniteQuery<
    ProductListResponse,
    Error,
    InfiniteData<ProductListResponse>,
    (string | number)[],
    number
  >({
    queryKey: productKeys.getEcoProductsByPage,
    queryFn: ({ pageParam = 1 }) => {
      return productQueryOptions.getEcoProductsByPage(pageParam, displayMode).queryFn();
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

export const useProductDetail = (id: string, displayMode: DisplayMode = "fallback") => {
  return useSuspenseQuery(productQueryOptions.getProductDetail(id, displayMode));
};

export const useSearchedProducts = (
  initialParams: Omit<GetSearchedProductsParams, "page">,
  displayMode: DisplayMode = "fallback"
) => {
  return useSuspenseInfiniteQuery<
    ProductListResponse,
    Error,
    InfiniteData<ProductListResponse>,
    (string | number)[],
    number
  >({
    queryKey: productKeys.getSearchedProducts(
      initialParams.keyword,
      initialParams.categoryId,
      initialParams.isGreen,
      1
    ),
    queryFn: ({ pageParam = 1 }) =>
      productQueryOptions.getSearchedProducts({ ...initialParams, page: pageParam }, displayMode).queryFn(),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? undefined : allPages.length + 1;
    },
    staleTime: 0,
    gcTime: 0,
    meta: { displayMode },
  });
};
