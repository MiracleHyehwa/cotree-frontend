import { getCategories } from "./get";
import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";

export const categoryQueryOptions = {
  all: ["category"] as const,

  getCategories: (displayMode: DisplayMode = "fallback") => ({
    queryKey: categoryQueryOptions.all,
    queryFn: () => getCategories(displayMode),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    meta: { displayMode },
  }),
};
