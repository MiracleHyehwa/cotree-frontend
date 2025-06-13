import { getProductsByCategory } from "./get";
import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";

export const productKeys = {
  all: ["products"] as const,
  byCategoryPage: (categoryId: string) => [...productKeys.all, "byCategoryPage", categoryId] as const,
};

export const productQueryOptions = {
  getProductsByCategory: (categoryId: string, page = 1, displayMode: DisplayMode = "fallback") => ({
    queryKey: productKeys.byCategoryPage(categoryId),
    queryFn: () => getProductsByCategory(categoryId, page, displayMode),
    meta: { displayMode },
  }),
};
