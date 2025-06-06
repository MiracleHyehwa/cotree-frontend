import { useState } from "react";
import { CartContext } from "./cartContext";
import type { CartItem } from "@/entities/cart/model";

interface CartProviderProps {
  initialItems: CartItem[];
  children: React.ReactNode;
}

export default function CartProvider({ initialItems, children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<(CartItem & { selected: boolean })[]>(
    initialItems.map((item) => ({ ...item, selected: true }))
  );

  return <CartContext.Provider value={{ cartItems, setCartItems }}>{children}</CartContext.Provider>;
}
