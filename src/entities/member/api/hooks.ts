import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { useSuspenseQuery } from "@tanstack/react-query";
import { memberQueryOptions } from "./queryOptions";

export const useMemberDashboard = (displayMode: DisplayMode = "fallback") => {
  return useSuspenseQuery(memberQueryOptions.getMemberDashboard(displayMode));
};
