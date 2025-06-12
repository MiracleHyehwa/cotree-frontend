import { useState, useRef, useCallback } from "react";
import { EnvironmentContext, EnvironmentContextValue } from "./environmentContext";
import { calculateGrassAmount } from "@/features/environment/utils";
import type { Tree } from "@/entities/environment/tree";
import type { Grass } from "@/entities/environment/grass";

interface EnvironmentProviderProps {
  children: React.ReactNode;
  initialExp: number;
  initialRemainingWaterUnit: number;
}

export default function EnvironmentProvider({
  children,
  initialExp,
  initialRemainingWaterUnit,
}: EnvironmentProviderProps) {
  const [exp, setExp] = useState(initialExp);
  const [remainingWaterUnit, setRemainingWaterUnit] = useState(initialRemainingWaterUnit);

  const baseTreeRef = useRef<Tree>(null);
  const grassRef = useRef<Grass>(null);
  const [isReady, setIsReady] = useState(false);

  const syncGrowthFromExp = useCallback((exp: number) => {
    const baseTree = baseTreeRef.current;
    const grass = grassRef.current;

    if (!baseTree || !grass) return;

    baseTree.queueGrowthFromExp(exp);
    const targetGrassAmount = calculateGrassAmount(exp);
    grass.setGrassAmount(targetGrassAmount);
  }, []);

  const value: EnvironmentContextValue = {
    exp,
    setExp,
    remainingWaterUnit,
    setRemainingWaterUnit,
    syncGrowthFromExp,
    baseTreeRef,
    grassRef,
    isReady,
    setIsReady,
  };

  return <EnvironmentContext.Provider value={value}>{children}</EnvironmentContext.Provider>;
}
