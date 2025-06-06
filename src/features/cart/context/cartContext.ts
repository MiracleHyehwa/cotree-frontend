import { createContext } from "react";
import type { CartItem } from "@/entities/cart/model";

export interface CartContextType {
  cartItems: (CartItem & { selected: boolean })[];
  setCartItems: React.Dispatch<React.SetStateAction<(CartItem & { selected: boolean })[]>>;
}

export const CartContext = createContext<CartContextType | null>(null);
