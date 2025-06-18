import { api } from "@/shared/lib/api/ky";
import { ApiResponse } from "@/shared/model/commonApiResponse";
import { OrderDetail, OrderListItem } from "../model";
import { BaseApiError, DisplayMode } from "@/shared/lib/api/errors/baseApiError";

export const getOrderList = async (
  page: number = 1,
  status?: string,
  displayMode: DisplayMode = "fallback"
): Promise<OrderListItem[]> => {
  try {
    const res = await api
      .get("orders", {
        searchParams: {
          page,
          ...(status ? { status } : {}),
        },
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

export const getOrderDetail = async (orderId: string, displayMode: DisplayMode = "fallback"): Promise<OrderDetail> => {
  try {
    const res = await api.get(`orders/${orderId}`).json<ApiResponse<OrderDetail>>();

    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
