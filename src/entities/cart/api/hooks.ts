import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { cartKeys, cartQueryOptions } from "./queries";
import { CartItem } from "../model";
import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { useCartContext } from "@/features/cart/hooks";
import { deleteCartItem } from "./delete";

export const useCartItems = (displayMode: DisplayMode = "fallback") => {
  return useSuspenseQuery<CartItem[]>(cartQueryOptions.getCartItems(displayMode));
};

export const useDeleteCartItem = (displayMode: DisplayMode = "toast") => {
  const queryClient = useQueryClient();
  const { cartItems, setCartItems } = useCartContext();
  return useMutation({
    mutationFn: (basketItemId: number) => deleteCartItem(basketItemId, displayMode),

    onMutate: async (basketItemId) => {
      const previousItems = cartItems;
      setCartItems((prev) => prev.filter((item) => item.basketItemId !== basketItemId));
      return { previousItems };
    },

    onError: (_err, _basketItemId, context) => {
      if (context?.previousItems) {
        setCartItems(context.previousItems);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.getCartItems });
    },

    meta: { displayMode },
  });
};
