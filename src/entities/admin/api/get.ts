import { api } from "@/shared/lib/api/ky";
import { ApiResponse } from "@/shared/model/commonApiResponse";
import { BaseApiError, DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { InsightOverviewResponse, PointStatResponse } from "../model";

export const getPointStats = async (
  range: string,
  displayMode: DisplayMode = "fallback"
): Promise<PointStatResponse[]> => {
  try {
    const res = await api
      .get("admin/insights/points", {
        searchParams: { range },
      })
      .json<ApiResponse<PointStatResponse[]>>();

    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};

export const getInsightOverview = async (displayMode: DisplayMode = "fallback"): Promise<InsightOverviewResponse> => {
  try {
    const res = await api.get("admin/insights/overview").json<ApiResponse<InsightOverviewResponse>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
