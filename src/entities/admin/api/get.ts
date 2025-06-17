import { ApiResponse } from "@/shared/model/commonApiResponse";
import { BaseApiError, DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import {
  EcoPopularItemResponse,
  InsightOverviewResponse,
  PointStatResponse,
  PurchaseCategoryStatResponse,
  PurchaseCountResponse,
} from "../model";
import { adminApi } from "@/shared/lib/api/adminKy";

export const getPointStats = async (
  range: string,
  displayMode: DisplayMode = "fallback"
): Promise<PointStatResponse[]> => {
  try {
    const res = await adminApi
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
    const res = await adminApi.get("admin/insights/overview").json<ApiResponse<InsightOverviewResponse>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};

export const getEcoPopularItems = async (displayMode: DisplayMode = "fallback") => {
  try {
    const res = await adminApi.get("admin/statistics/eco/popular-item").json<ApiResponse<EcoPopularItemResponse>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};

export const getPurchaseCategory = async (displayMode: DisplayMode = "fallback") => {
  try {
    const res = await adminApi
      .get("admin/statistics/eco/purchase-category")
      .json<ApiResponse<PurchaseCategoryStatResponse>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};

export const getPurchaseCount = async (displayMode: DisplayMode = "fallback") => {
  try {
    const res = await adminApi.get("admin/statistics/eco/purchase-count").json<ApiResponse<PurchaseCountResponse>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
