import { environmentQueryOptions } from "./queryOptions";
import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { GiveWaterRequest, GiveWaterResponse, MyTreeResponse } from "../model";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useEnvironmentContext } from "@/features/environment/hooks";
import { giveWater } from "./update";
import { MAX_EXP } from "../constants";

export const useMyTree = (displayMode: DisplayMode = "fallback") => {
  return useQuery<MyTreeResponse>(environmentQueryOptions.getMyTree(displayMode));
};

export const useGiveWater = (displayMode: DisplayMode = "toast") => {
  const { exp, setExp, setRemainingWaterUnit, syncGrowthFromExp } = useEnvironmentContext();

  return useMutation<GiveWaterResponse, Error, GiveWaterRequest>({
    mutationFn: (payload) => giveWater(payload, displayMode),

    onSuccess: ({ exp: serverExp, remainingWaterUnit: serverUnit }) => {
      if (serverExp >= MAX_EXP && exp >= MAX_EXP) return;

      setExp(serverExp);
      syncGrowthFromExp(serverExp);
      setRemainingWaterUnit(serverUnit);
    },

    meta: { displayMode, position: "top-right" },
  });
};

export const useMyTreeSummary = (displayMode: DisplayMode = "fallback") => {
  return useSuspenseQuery(environmentQueryOptions.getMyTreeSummary(displayMode));
};
