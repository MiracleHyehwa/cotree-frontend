import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { getMyTree } from "./get";

export const environmentKeys = {
  myTree: ["environment", "myTree"] as const,
};

export const environmentQueryOptions = {
  getMyTree: (displayMode: DisplayMode = "fallback") => ({
    queryKey: environmentKeys.myTree,
    queryFn: () => getMyTree(displayMode),
    staleTime: 0,
    gcTime: 0,
    meta: { displayMode },
  }),
};
