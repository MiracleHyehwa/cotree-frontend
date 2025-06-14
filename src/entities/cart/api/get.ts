import { api } from "@/shared/lib/api/ky";
import { ApiResponse } from "@/shared/model/commonApiResponse";
import { BaseApiError, DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { CartItemCountResponse, CartItemResponse } from "../model/apiResponse";

export const getCartItems = async (displayMode: DisplayMode = "fallback") => {
  try {
    const response = await api.get("shopping-basket").json<ApiResponse<CartItemResponse>>();
    return response.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};

export const getCartItemCount = async (displayMode: DisplayMode = "toast"): Promise<number> => {
  try {
    const res = await api.get("shopping-basket/count").json<ApiResponse<CartItemCountResponse>>();
    return res.data.count;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
