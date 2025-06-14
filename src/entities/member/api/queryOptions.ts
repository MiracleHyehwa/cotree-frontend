import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { getMemberDashboard } from "./get";

export const memberKeys = {
  getMemberDashboard: () => ["member", "dashboard"] as const,
};

export const memberQueryOptions = {
  getMemberDashboard: (displayMode: DisplayMode = "fallback") => ({
    queryKey: memberKeys.getMemberDashboard(),
    queryFn: () => getMemberDashboard(displayMode),
  }),
};
