import { useSuspenseQuery } from "@tanstack/react-query";
import { cartQueryOptions } from "./queries";
import { CartItem } from "../model";

export const useCartItems = () => {
  return useSuspenseQuery<CartItem[]>(cartQueryOptions.getCartItems());
};
