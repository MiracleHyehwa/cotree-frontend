import { api } from "@/shared/lib/api/ky";
import { BaseApiError, DisplayMode } from "@/shared/lib/api/errors/baseApiError";

export const deleteCartItem = async (basketItemId: number, displayMode: DisplayMode = "toast") => {
  try {
    await api.delete(`shopping-basket/${basketItemId}`);
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
