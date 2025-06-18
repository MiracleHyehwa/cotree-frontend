import { InfiniteData, useMutation, useSuspenseInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createOrder, retryOrderPayment } from "./create";
import { OrderListItem, OrderRequest, RetryOrderPaymentRequest } from "../model";
import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { orderKeys, orderQueryOptions } from "./queryOptions";

export const useCreateOrder = (displayMode: DisplayMode = "toast") => {
  return useMutation({
    mutationFn: (payload: OrderRequest) => createOrder(payload, displayMode),
    meta: { displayMode, position: "top-right" },
  });
};

export const useOrderListInfinite = (status?: string, displayMode: DisplayMode = "fallback") => {
  return useSuspenseInfiniteQuery<OrderListItem[], Error, InfiniteData<OrderListItem[]>, (string | number)[], number>({
    queryKey: orderKeys.getOrderListPage(status),
    queryFn: ({ pageParam = 1 }) => orderQueryOptions.getOrderList(status, pageParam, displayMode).queryFn(),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? undefined : allPages.length + 1;
    },
    staleTime: 0,
    gcTime: 0,
    meta: { displayMode },
  });
};

export const useOrderDetail = (orderId: string, displayMode: DisplayMode = "fallback") => {
  return useSuspenseQuery(orderQueryOptions.getOrderDetail(orderId, displayMode));
};

export const useRetryOrderPayment = (displayMode: DisplayMode = "toast") => {
  return useMutation({
    mutationFn: (payload: RetryOrderPaymentRequest) => retryOrderPayment(payload, displayMode),
    meta: { displayMode, position: "top-right" },
  });
};
