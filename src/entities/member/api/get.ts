import { api } from "@/shared/lib/api/ky";
import { ApiResponse } from "@/shared/model/commonApiResponse";
import { MyPageResponse } from "../model";
import { BaseApiError, DisplayMode } from "@/shared/lib/api/errors/baseApiError";

export const getMemberDashboard = async (displayMode: DisplayMode = "fallback"): Promise<MyPageResponse> => {
  try {
    const res = await api.get("members").json<ApiResponse<MyPageResponse>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
