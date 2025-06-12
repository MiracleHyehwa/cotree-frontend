import { InfiniteData, useInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import { greenPointQueryOptions } from "./queryOptionts";
import { PointHistoryResponse } from "../model";

export const usePointSummary = () => {
  return useSuspenseQuery(greenPointQueryOptions.summary());
};

export const usePointHistory = (totalCount: number) => {
  return useInfiniteQuery<PointHistoryResponse, Error, InfiniteData<PointHistoryResponse>, (string | number)[], number>(
    {
      queryKey: ["point", "history", totalCount],
      queryFn: ({ pageParam = 1 }) => greenPointQueryOptions.history(pageParam).queryFn(),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const loaded = allPages.flat().length;

        if (totalCount === 0 || loaded >= totalCount) {
          return undefined;
        }

        if (lastPage.length === 0) {
          return undefined;
        }

        return loaded < totalCount ? allPages.length + 1 : undefined;
      },
    }
  );
};
