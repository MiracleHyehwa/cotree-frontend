import { api } from "@/shared/lib/api/ky";
import { GiveWaterRequest, GiveWaterResponse } from "../model";
import { BaseApiError, DisplayMode } from "@/shared/lib/api/errors/baseApiError";

const ACTION_ENDPOINT_MAP: Record<GiveWaterRequest["action"], string> = {
  GIVE_WATER: "tree/water",
  GIVE_ALL_WATER: "tree/water-all",
};

export const giveWater = async (
  payload: GiveWaterRequest,
  displayMode: DisplayMode = "toast"
): Promise<GiveWaterResponse> => {
  try {
    const url = ACTION_ENDPOINT_MAP[payload.action];
    const response = await api.post(url, { json: payload }).json<{ data: GiveWaterResponse }>();
    return response.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
