import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { cartKeys, cartQueryOptions } from "./queries";
import { CartItem } from "../model";
import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { useCartContext } from "@/features/cart/hooks";
import { deleteCartItem } from "./delete";
import { addToCart } from "./create";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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

export const useAddToCart = (displayMode: DisplayMode = "toast") => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: number; quantity: number }) =>
      addToCart(itemId, quantity, displayMode),

    onSuccess: () => {
      toast("장바구니에 담았습니다.", {
        position: "top-center",
        duration: 2000,
        action: {
          label: "장바구니 보기",
          onClick: () => navigate("/cart"),
        },
      });
    },

    meta: { displayMode, position: "top-right" },
  });
};
