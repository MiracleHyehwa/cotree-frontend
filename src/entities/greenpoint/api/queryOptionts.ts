import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { getPointHistory, getPointSummary } from "./get";

export const greenPointKeys = {
  all: ["point"] as const,
  history: (page: number) => [...greenPointKeys.all, "history", page] as const,
  summary: () => [...greenPointKeys.all, "summary"] as const,
};

export const greenPointQueryOptions = {
  history: (page: number, displayMode: DisplayMode = "toast") => ({
    queryKey: greenPointKeys.history(page),
    queryFn: () => getPointHistory(page, displayMode),
  }),
  summary: (displayMode: DisplayMode = "fallback") => ({
    queryKey: greenPointKeys.summary(),
    queryFn: () => getPointSummary(displayMode),
  }),
};
