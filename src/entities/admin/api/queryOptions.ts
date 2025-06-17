import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import {
  getEcoPopularItems,
  getInsightOverview,
  getPointStats,
  getPurchaseAge,
  getPurchaseCategory,
  getPurchaseCount,
  getPurchaseGender,
} from "./get";

export const adminKeys = {
  getInsightOverview: ["admin", "insight", "overview"] as const,
  getPointStats: (range: string) => ["admin", "insight", "points", range] as const,
  getEcoPopularItems: ["admin", "eco", "popular", "items"] as const,
  getPurchaseCategory: ["admin", "eco", "purcharse", "category"] as const,
  getPurchaseCount: ["admin", "purchase", "count"] as const,
  getPurchaseGender: ["admin", "purchase", "gender"] as const,
  getPurchaseAge: ["admin", "purchase", "age"] as const,
};

export const adminQueryOptions = {
  getPointStats: (range: string, displayMode: DisplayMode = "fallback") => ({
    queryKey: adminKeys.getPointStats(range),
    queryFn: () => getPointStats(range, displayMode),
    meta: { displayMode },
  }),

  getInsightOverview: (displayMode: DisplayMode = "fallback") => ({
    queryKey: adminKeys.getInsightOverview,
    queryFn: () => getInsightOverview(displayMode),
    meta: { displayMode },
  }),

  getEcoPopularItems: (displayMode: DisplayMode = "fallback") => ({
    queryKey: adminKeys.getEcoPopularItems,
    queryFn: () => getEcoPopularItems(displayMode),
    meta: { displayMode },
  }),

  getPurchaseCategory: (displayMode: DisplayMode = "fallback") => ({
    queryKey: adminKeys.getPurchaseCategory,
    queryFn: () => getPurchaseCategory(displayMode),
    meta: { displayMode },
  }),

  getPurchaseCount: (displayMode: DisplayMode = "fallback") => ({
    queryKey: adminKeys.getPurchaseCount,
    queryFn: () => getPurchaseCount(displayMode),
    meta: { displayMode },
  }),

  getPurchaseGender: (displayMode: DisplayMode = "fallback") => ({
    queryKey: adminKeys.getPurchaseGender,
    queryFn: () => getPurchaseGender(displayMode),
    meta: { displayMode },
  }),

  getPurchaseAge: (displayMode: DisplayMode = "fallback") => ({
    queryKey: adminKeys.getPurchaseAge,
    queryFn: () => getPurchaseAge(displayMode),
    meta: { displayMode },
  }),
};
