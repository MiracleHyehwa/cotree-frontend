import { api } from "@/shared/lib/api/ky";
import { DisplayMode, BaseApiError } from "@/shared/lib/api/errors/baseApiError";
import { OrderRequest, RetryOrderPaymentRequest } from "../model";
import { ApiResponse } from "@/shared/model/commonApiResponse";

export const createOrder = async (payload: OrderRequest, displayMode: DisplayMode = "toast"): Promise<string> => {
  try {
    const res = await api.post("orders", { json: payload }).json<ApiResponse<string>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};

export const retryOrderPayment = async (
  payload: RetryOrderPaymentRequest,
  displayMode: DisplayMode = "toast"
): Promise<null> => {
  try {
    const res = await api.post("payments", { json: payload }).json<ApiResponse<null>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
