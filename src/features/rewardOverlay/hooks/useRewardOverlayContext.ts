import { useContext } from "react";
import { RewardOverlayContext } from "../context";

export function useRewardOverlayContext() {
  const context = useContext(RewardOverlayContext);
  if (!context) throw new Error("useRewardContext must be used within RewardContextProvider");
  return context;
}
