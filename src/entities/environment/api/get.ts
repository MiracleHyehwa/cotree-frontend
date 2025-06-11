import { BaseApiError, DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { api } from "@/shared/lib/api/ky";
import { MyTreeResponse } from "../model";

export const getMyTree = async (displayMode: DisplayMode = "fallback") => {
  try {
    const response = await api.get("tree").json<{ data: MyTreeResponse }>();
    return response.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
