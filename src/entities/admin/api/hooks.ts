import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { adminQueryOptions } from "@/entities/admin/api/queryOptions";
import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { AdminLoginFormValues } from "../model/schema";
import { loginAdmin } from "./create";

export const usePointStats = () => {
  return useSuspenseQuery(adminQueryOptions.getPointStats("90d"));
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

export const useEcoPopularItems = () => {
  return useSuspenseQuery(adminQueryOptions.getEcoPopularItems());
};

export const usePurchaseCategory = () => {
  return useSuspenseQuery(adminQueryOptions.getPurchaseCategory());
};

export const usePurchaseCount = () => {
  return useSuspenseQuery(adminQueryOptions.getPurchaseCount());
};

export const usePurchaseGender = () => {
  return useSuspenseQuery(adminQueryOptions.getPurchaseGender());
};
