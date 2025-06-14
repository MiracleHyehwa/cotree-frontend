import { useMutation } from "@tanstack/react-query";
import { createOrder } from "./create";
import { OrderRequest } from "../model";
import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";

export const useCreateOrder = (displayMode: DisplayMode = "toast") => {
  return useMutation({
    mutationFn: (payload: OrderRequest) => createOrder(payload, displayMode),
    meta: { displayMode, position: "top-right" },
  });
};
