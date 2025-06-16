import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { getOrderList } from "./get";

export const orderKeys = {
  getOrderList: (status?: string) => ["admin", "orders", status ?? "ALL"] as const,
};

export const orderQueryOptions = {
  getOrderList: (status?: string, displayMode: DisplayMode = "fallback") => ({
    queryKey: orderKeys.getOrderList(status),
    queryFn: () => getOrderList(status, displayMode),
  }),
};
