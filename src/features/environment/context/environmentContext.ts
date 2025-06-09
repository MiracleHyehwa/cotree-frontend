import { createContext, RefObject } from "react";
import type { Grass } from "@/entities/environment/grass";
import type { Tree } from "@/entities/environment/tree";

export interface EnvironmentContextValue {
  exp: number;
  setExp: (v: number) => void;
  increaseExp: (amount: number) => void;
  baseTreeRef: RefObject<Tree | null>;
  grassRef: RefObject<Grass | null>;
  isReady: boolean;
  setIsReady: (ready: boolean) => void;
}

export const EnvironmentContext = createContext<EnvironmentContextValue | null>(null);
