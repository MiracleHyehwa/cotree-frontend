import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { getCartItems } from "./get";
import { deleteCartItem } from "./delete";
import { QueryClient } from "@tanstack/react-query";

export const cartKeys = {
  getCartItems: ["cart"] as const,
};

export const cartQueryOptions = {
  getCartItems: (displayMode: DisplayMode = "fallback") => ({
    queryKey: cartKeys.getCartItems,
    queryFn: () => getCartItems(displayMode),
    staleTime: 0,
    gcTime: 0,
    meta: { displayMode },
  }),
};

export const cartMutationOptions = {
  deleteCartItem: (queryClient: QueryClient, displayMode: DisplayMode = "toast") => ({
    mutationFn: (basketItemId: number) => deleteCartItem(basketItemId, displayMode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.getCartItems });
    },
    meta: { displayMode },
  }),
};
