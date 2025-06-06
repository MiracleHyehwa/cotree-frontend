import { useContext } from "react";
import { CartContext } from "@/features/cart/context/cartContext";

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("CartContext is not provided");
  return ctx;
}
