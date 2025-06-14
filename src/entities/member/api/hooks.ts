import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { memberQueryOptions } from "./queryOptions";
import { updateAgeAndGender, updateMemberProfile } from "./update";

export const useMemberDashboard = (displayMode: DisplayMode = "fallback") => {
  return useSuspenseQuery(memberQueryOptions.getMemberDashboard(displayMode));
};

export const useUpdateProfile = (displayMode: DisplayMode = "toast") => {
  return useMutation({
    mutationFn: (formData: FormData) => updateMemberProfile(formData, displayMode),
    meta: { displayMode },
  });
};

export const useUpdateAgeGender = (displayMode: DisplayMode = "toast") => {
  return useMutation({
    mutationFn: ({ gender, ageRange }: { gender: string; ageRange: string }) =>
      updateAgeAndGender(gender, ageRange, displayMode),
    meta: { displayMode },
  });
};
