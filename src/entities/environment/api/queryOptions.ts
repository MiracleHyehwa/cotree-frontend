import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { getMyTree, getMyTreeSummary } from "./get";

export const environmentKeys = {
  getMyTree: ["environment", "myTree"] as const,
  getMyTreeSummary: ["environment", "myTreeSummary"] as const,
};

export const environmentQueryOptions = {
  getMyTree: (displayMode: DisplayMode = "fallback") => ({
    queryKey: environmentKeys.getMyTree,
    queryFn: () => getMyTree(displayMode),
    staleTime: 0,
    gcTime: 0,
    meta: { displayMode },
  }),

  getMyTreeSummary: (displayMode: DisplayMode = "fallback") => ({
    queryKey: environmentKeys.getMyTreeSummary,
    queryFn: () => getMyTreeSummary(displayMode),
    staleTime: 0,
    gcTime: 0,
    meta: { displayMode },
  }),
};
