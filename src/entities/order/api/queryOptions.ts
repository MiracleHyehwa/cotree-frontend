import { api } from "@/shared/lib/api/ky";
import { DisplayMode, BaseApiError } from "@/shared/lib/api/errors/baseApiError";
import { OrderRequest } from "../model";

export const createOrder = async (
  payload: OrderRequest,
  displayMode: DisplayMode = "toast"
): Promise<OrderResponse> => {
  try {
    const res = await api.post("orders", { json: payload }).json<{ data: OrderResponse }>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
