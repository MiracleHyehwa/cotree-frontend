import { getCartItems } from "./get";

export const cartKeys = {
  getCartItems: ["cart"] as const,
};

export const cartQueryOptions = {
  getCartItems: () => ({
    queryKey: cartKeys.getCartItems,
    queryFn: getCartItems,
    staleTime: 0,
    cacheTime: 0,
  }),
};
