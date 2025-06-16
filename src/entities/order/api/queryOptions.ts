import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { getOrderDetail, getOrderList } from "./get";

export const orderKeys = {
  getOrderList: (status?: string) => ["admin", "orders", status ?? "ALL"] as const,
  getOrderDetail: (orderId: string) => ["order", "detail", orderId] as const,
};

export const orderQueryOptions = {
  getOrderList: (status?: string, displayMode: DisplayMode = "fallback") => ({
    queryKey: orderKeys.getOrderList(status),
    queryFn: () => getOrderList(status, displayMode),
  }),

  getOrderDetail: (orderId: string, displayMode: DisplayMode = "fallback") => ({
    queryKey: orderKeys.getOrderDetail(orderId),
    queryFn: () => getOrderDetail(orderId, displayMode),
    retry: 0,
    meta: { displayMode },
  }),
};
