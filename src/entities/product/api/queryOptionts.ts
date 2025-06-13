import { GetSearchedProductsParams } from "../model";
import {
  getEcoProductByPage,
  getEcoProducts,
  getProductDetail,
  getProductsByCategory,
  getSearchedProducts,
} from "./get";
import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";

export const productKeys = {
  getProductsByCategoryPage: (categoryId: string) => ["products", "byCategoryPage", categoryId] as (string | number)[],
  getEcoProducts: ["products", "eco"] as (string | number)[],
  getEcoProductsByPage: ["products", "ecoPage"] as (string | number)[],
  getSearchedProducts: (keyword: string, categoryId: number | null, isGreen: string | null, page: number) =>
    ["products", "search", keyword, categoryId, isGreen, page] as (string | number)[],
  getProductDetail: (id: string) => ["products", "detail", id] as (string | number)[],
};

export const productQueryOptions = {
  getProductsByCategory: (categoryId: string, page = 1, displayMode: DisplayMode = "fallback") => ({
    queryKey: productKeys.getProductsByCategoryPage(categoryId),
    queryFn: () => getProductsByCategory(categoryId, page, displayMode),
    meta: { displayMode },
  }),

  getEcoProducts: (displayMode: DisplayMode = "fallback") => ({
    queryKey: productKeys.getEcoProducts,
    queryFn: () => getEcoProducts(displayMode),
    meta: { displayMode },
  }),

  getEcoProductsByPage: (page: number, displayMode: DisplayMode = "fallback") => ({
    queryKey: productKeys.getEcoProductsByPage,
    queryFn: () => getEcoProductByPage(page, displayMode),
    meta: { displayMode },
  }),

  getProductDetail: (id: string, displayMode: DisplayMode = "fallback") => ({
    queryKey: productKeys.getProductDetail(id),
    queryFn: () => getProductDetail(id, displayMode),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    meta: { displayMode },
  }),

  getSearchedProducts: (params: GetSearchedProductsParams, displayMode: DisplayMode = "fallback") => ({
    queryKey: productKeys.getSearchedProducts(params.keyword, params.categoryId, params.isGreen, params.page),
    queryFn: () => getSearchedProducts(params, displayMode),
    meta: { displayMode },
  }),
};
