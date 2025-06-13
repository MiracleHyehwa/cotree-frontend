import { BaseApiError, DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { ApiResponse } from "@/shared/model/commonApiResponse";
import { CategoryResponse } from "../model";
import { api } from "@/shared/lib/api/ky";

export const getCategories = async (displayMode: DisplayMode = "fallback"): Promise<CategoryResponse> => {
  try {
    const res = await api.get("categories").json<ApiResponse<CategoryResponse>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
