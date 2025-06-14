import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { getCartItemCount, getCartItems } from "./get";

export const cartKeys = {
  getCartItems: ["cart"] as const,
  getCartItemCount: ["cart", "count"] as const,
};

export const cartQueryOptions = {
  getCartItems: (displayMode: DisplayMode = "fallback") => ({
    queryKey: cartKeys.getCartItems,
    queryFn: () => getCartItems(displayMode),
    staleTime: 0,
    gcTime: 0,
    meta: { displayMode },
  }),

  getCartItemCount: (displayMode: DisplayMode = "toast") => ({
    queryKey: cartKeys.getCartItemCount,
    queryFn: () => getCartItemCount(displayMode),
    meta: { displayMode },
  }),
};
