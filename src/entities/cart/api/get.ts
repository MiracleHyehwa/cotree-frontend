import { api } from "@/shared/lib/api/ky";
import { ApiResponse, CartItem } from "../model";
import { BaseApiError, DisplayMode } from "@/shared/lib/api/errors/baseApiError";

export const getCartItems = async (displayMode: DisplayMode = "fallback") => {
  try {
    const response = await api.get("shopping-basket").json<ApiResponse<CartItem[]>>();
    return response.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
