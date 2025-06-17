import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { getEcoPopularItems, getInsightOverview, getPointStats } from "./get";

export const adminKeys = {
  getInsightOverview: ["admin", "insight", "overview"] as const,
  getPointStats: (range: string) => ["admin", "insight", "points", range] as const,
  getEcoPopularItems: ["admin", "eco", "popular", "items"] as const,
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
};
