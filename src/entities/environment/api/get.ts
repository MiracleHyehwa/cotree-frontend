import { BaseApiError, DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { api } from "@/shared/lib/api/ky";
import { MyTreeResponse, MyTreeSummaryResponse } from "../model";

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

export const getMyTreeSummary = async (displayMode: DisplayMode = "fallback") => {
  try {
    const response = await api.get("tree/summary", {
      throwHttpErrors: false,
    });

    if (response.status === 204) {
      return {
        isLoggedIn: false,
        exp: 0,
        ecoCount: 0,
      } satisfies MyTreeSummaryResponse & { isLoggedIn: boolean };
    }

    const json = await response.json<{ data: MyTreeSummaryResponse }>();

    return {
      isLoggedIn: true,
      ...json.data,
    };
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
