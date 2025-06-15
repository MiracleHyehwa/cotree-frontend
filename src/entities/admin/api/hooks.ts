import { useSuspenseQuery } from "@tanstack/react-query";
import { adminQueryOptions } from "@/entities/admin/api/queryOptions";

export const usePointStats = (range: string) => {
  return useSuspenseQuery(adminQueryOptions.getPointStats(range));
};

export const useInsightOverview = () => {
  return useSuspenseQuery(adminQueryOptions.getInsightOverview());
};
