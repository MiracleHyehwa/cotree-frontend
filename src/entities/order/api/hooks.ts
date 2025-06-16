import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createOrder, retryOrderPayment } from "./create";
import { OrderRequest, RetryOrderPaymentRequest } from "../model";
import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { orderQueryOptions } from "./queryOptions";

export const useCreateOrder = (displayMode: DisplayMode = "toast") => {
  return useMutation({
    mutationFn: (payload: OrderRequest) => createOrder(payload, displayMode),
    meta: { displayMode, position: "top-right" },
  });
};

export const useOrderList = (status?: string, displayMode: DisplayMode = "fallback") => {
  return useSuspenseQuery(orderQueryOptions.getOrderList(status, displayMode));
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
