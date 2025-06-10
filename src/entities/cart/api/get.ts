import { api } from "@/shared/lib/api/ky";
import { CartItem } from "../model";

export const getCartItems = async (): Promise<CartItem[]> => {
  return await api.get("shopping-basket").json();
};
