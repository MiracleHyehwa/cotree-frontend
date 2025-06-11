import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { cartMutationOptions, cartQueryOptions } from "./queries";
import { CartItem } from "../model";
import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";

export const useCartItems = (displayMode: DisplayMode = "fallback") => {
  return useSuspenseQuery<CartItem[]>(cartQueryOptions.getCartItems(displayMode));
};

export const useDeleteCartItem = (displayMode: DisplayMode = "toast") => {
  const queryClient = useQueryClient();
  return useMutation(cartMutationOptions.deleteCartItem(queryClient, displayMode));
};
