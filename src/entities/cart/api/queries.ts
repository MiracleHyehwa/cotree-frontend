import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { getCartItems } from "./get";

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
