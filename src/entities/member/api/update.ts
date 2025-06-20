import { api } from "@/shared/lib/api/ky";
import { BaseApiError, DisplayMode } from "@/shared/lib/api/errors/baseApiError";

export const updateMemberProfile = async (formData: FormData, displayMode: DisplayMode = "toast"): Promise<boolean> => {
  try {
    const res = await api
      .patch("members", {
        body: formData,
      })
      .json<{ data: boolean }>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};

export const updateAgeAndGender = async (
  gender: string,
  ageRange: string,
  displayMode: DisplayMode = "toast"
): Promise<void> => {
  try {
    await api.patch("members/basic-info", {
      json: { gender, ageRange },
    });
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
