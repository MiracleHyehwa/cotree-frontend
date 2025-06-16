import { adminApi } from "@/shared/lib/api/adminKy";
import { AdminLoginFormValues } from "../model/schema";
import { BaseApiError, DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { ApiResponse } from "@/shared/model/commonApiResponse";

export const loginAdmin = async (
  form: AdminLoginFormValues,
  displayMode: DisplayMode = "toast"
): Promise<{ token: string }> => {
  try {
    const res = await adminApi
      .post("admin/login", {
        json: form,
      })
      .json<ApiResponse<{ token: string }>>();

    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
