import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createOrder } from "./create";
import { OrderRequest } from "../model";
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
