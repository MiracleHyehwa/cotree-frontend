import { api } from "@/shared/lib/api/ky";
import { GiveWaterRequest, GiveWaterResponse } from "../model";
import { BaseApiError, DisplayMode } from "@/shared/lib/api/errors/baseApiError";

export const giveWater = async (
  payload: GiveWaterRequest,
  displayMode: DisplayMode = "fallback"
): Promise<GiveWaterResponse> => {
  try {
    const response = await api.post("tree", { json: payload }).json<{ data: GiveWaterResponse }>();
    return response.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
