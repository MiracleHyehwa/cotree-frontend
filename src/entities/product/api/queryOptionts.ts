import { getEcoProducts, getProductDetail, getProductsByCategory } from "./get";
import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";

export const productKeys = {
  all: ["products"] as const,
  getProductsbyCategoryPage: (categoryId: string) => [...productKeys.all, "byCategoryPage", categoryId] as const,
  getEcoProducts: ["products", "eco"] as const,
};

export const productQueryOptions = {
  getProductsByCategory: (categoryId: string, page = 1, displayMode: DisplayMode = "fallback") => ({
    queryKey: productKeys.getProductsbyCategoryPage(categoryId),
    queryFn: () => getProductsByCategory(categoryId, page, displayMode),
    meta: { displayMode },
  }),

  getEcoProducts: (displayMode: DisplayMode = "fallback") => ({
    queryKey: productKeys.getEcoProducts,
    queryFn: () => getEcoProducts(displayMode),
    meta: { displayMode },
  }),

  getProductDetail: (id: string, displayMode: DisplayMode = "fallback") => ({
    queryKey: ["products", "detail", id] as const,
    queryFn: () => getProductDetail(id, displayMode),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    meta: { displayMode },
  }),
};
