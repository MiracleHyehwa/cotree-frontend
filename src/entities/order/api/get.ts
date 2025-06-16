import { api } from "@/shared/lib/api/ky";
import { ApiResponse } from "@/shared/model/commonApiResponse";
import { OrderListItem } from "../model";
import { BaseApiError, DisplayMode } from "@/shared/lib/api/errors/baseApiError";

export const getOrderList = async (
  status?: string,
  displayMode: DisplayMode = "fallback"
): Promise<OrderListItem[]> => {
  try {
    const res = await api
      .get("orders", {
        searchParams: status ? { status } : {},
      })
      .json<ApiResponse<OrderListItem[]>>();

    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
