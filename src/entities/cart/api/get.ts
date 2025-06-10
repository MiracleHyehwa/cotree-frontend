import { api } from "@/shared/lib/api/ky";
import { CartItem } from "../model";
import { BaseApiError, DisplayMode } from "@/shared/lib/api/errors/baseApiError";

export const getCartItems = async (displayMode: DisplayMode = "fallback") => {
  try {
    return await api.get("shopping-basket").json<CartItem[]>();
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
