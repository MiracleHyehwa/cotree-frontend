import { environmentQueryOptions } from "./queryOptions";
import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { GiveWaterRequest, GiveWaterResponse, MyTreeResponse } from "../model";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useEnvironmentContext } from "@/features/environment/hooks";
import { giveWater } from "./update";
import { MAX_EXP } from "../constants";
import { calculateLevel } from "@/features/environment/utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useMyTree = (displayMode: DisplayMode = "fallback") => {
  return useQuery<MyTreeResponse>(environmentQueryOptions.getMyTree(displayMode));
};

export const useGiveWater = (displayMode: DisplayMode = "toast") => {
  const navigate = useNavigate();
  const { exp, setExp, setRemainingWaterUnit, syncGrowthFromExp, startRain, stopRain } = useEnvironmentContext();

  return useMutation<GiveWaterResponse, Error, GiveWaterRequest>({
    mutationFn: (payload) => giveWater(payload, displayMode),

    onSuccess: ({ exp: serverExp, remainingWaterUnit: serverUnit }, variables) => {
      if (serverExp >= MAX_EXP && exp >= MAX_EXP) return;

      if (variables.action === "GIVE_ALL_WATER") {
        startRain();
        setTimeout(() => {
          stopRain();
        }, 5000);
      }

      const prevLevel = calculateLevel(exp);
      const newLevel = calculateLevel(serverExp);

      setExp(serverExp);
      syncGrowthFromExp(serverExp);
      setRemainingWaterUnit(serverUnit);

      const rewardLevels = [3, 6, 9, 10];

      if (newLevel > prevLevel && rewardLevels.includes(newLevel)) {
        toast(`🎉 나무가 ${newLevel}레벨로 성장했어요!`, {
          position: "top-center",
          duration: 3000,
          action: {
            label: "보상 확인",
            onClick: () => navigate("/mypage/rewards"),
          },
        });
      }
    },

    meta: { displayMode, position: "top-right" },
  });
};

export const useMyTreeSummary = (displayMode: DisplayMode = "fallback") => {
  return useSuspenseQuery(environmentQueryOptions.getMyTreeSummary(displayMode));
};
