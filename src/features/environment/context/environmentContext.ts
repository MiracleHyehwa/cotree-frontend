import { createContext, RefObject } from "react";
import type { Grass } from "@/entities/environment/grass";
import type { Tree } from "@/entities/environment/tree";
import { Environment } from "@/entities/environment/system";

export interface EnvironmentContextValue {
  exp: number;
  setExp: (v: number) => void;
  syncGrowthFromExp: (exp: number) => void;
  setRemainingWaterUnit: (v: number) => void;
  remainingWaterUnit: number;
  baseTreeRef: RefObject<Tree | null>;
  grassRef: RefObject<Grass | null>;
  isReady: boolean;
  setIsReady: (ready: boolean) => void;
  startRain: () => void;
  stopRain: () => void;
  registerEnv: (env: Environment) => void;
}

export const EnvironmentContext = createContext<EnvironmentContextValue | null>(null);
