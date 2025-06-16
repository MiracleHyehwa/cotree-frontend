import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { adminQueryOptions } from "@/entities/admin/api/queryOptions";
import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { AdminLoginFormValues } from "../model/schema";
import { loginAdmin } from "./create";

export const usePointStats = (range: string) => {
  return useSuspenseQuery(adminQueryOptions.getPointStats(range));
};

export const useInsightOverview = () => {
  return useSuspenseQuery(adminQueryOptions.getInsightOverview());
};

export const useAdminLogin = (displayMode: DisplayMode = "toast") => {
  return useMutation({
    mutationFn: (form: AdminLoginFormValues) => loginAdmin(form, displayMode),
    meta: { displayMode },
  });
};
