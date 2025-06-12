import { api } from "@/shared/lib/api/ky";
import { PointHistoryResponse, PointSummaryResponse } from "../model";
import { BaseApiError, DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { ApiResponse } from "@/shared/model/commonApiResponse";

export const getPointSummary = async (displayMode: DisplayMode = "fallback"): Promise<PointSummaryResponse> => {
  try {
    const res = await api.get("greenpoint/summary").json<ApiResponse<PointSummaryResponse>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};

export const getPointHistory = async (
  page: number,
  displayMode: DisplayMode = "fallback"
): Promise<PointHistoryResponse> => {
  try {
    const res = await api.get("greenpoint", { searchParams: { page } }).json<ApiResponse<PointHistoryResponse>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
