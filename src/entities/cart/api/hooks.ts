import { useSuspenseQuery } from "@tanstack/react-query";
import { cartQueryOptions } from "./queries";
import { CartItem } from "../model";
import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";

export const useCartItems = (displayMode: DisplayMode = "fallback") => {
  return useSuspenseQuery<CartItem[]>(cartQueryOptions.getCartItems(displayMode));
};
