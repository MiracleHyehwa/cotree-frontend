import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { getOrderDetail, getOrderList } from "./get";

export const orderKeys = {
  getOrderListPage: (status?: string) => ["admin", "orders", status ?? "ALL"],
  getOrderDetail: (orderId: string) => ["order", "detail", orderId] as const,
};

export const orderQueryOptions = {
  getOrderList: (status?: string, page: number = 1, displayMode: DisplayMode = "fallback") => ({
    queryKey: orderKeys.getOrderListPage(status),
    queryFn: () => getOrderList(page, status, displayMode),
    meta: { displayMode },
  }),

  getOrderDetail: (orderId: string, displayMode: DisplayMode = "fallback") => ({
    queryKey: orderKeys.getOrderDetail(orderId),
    queryFn: () => getOrderDetail(orderId, displayMode),
    retry: 0,
    meta: { displayMode },
  }),
};
