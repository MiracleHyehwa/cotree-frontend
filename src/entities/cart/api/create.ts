import { BaseApiError, DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { api } from "@/shared/lib/api/ky";
import { ApiResponse } from "@/shared/model/commonApiResponse";

export const addToCart = async (itemId: number, quantity: number, displayMode: DisplayMode = "toast") => {
  try {
    await api.post("shopping-basket", { json: { itemId, quantity } }).json<ApiResponse<null>>();
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
