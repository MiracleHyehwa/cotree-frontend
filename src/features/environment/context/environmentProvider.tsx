import { useState, useRef, useCallback } from "react";
import { EnvironmentContext, EnvironmentContextValue } from "./environmentContext";
import { calculateGrassAmount } from "@/features/environment/utils";
import type { Tree } from "@/entities/environment/tree";
import type { Grass } from "@/entities/environment/grass";

interface EnvironmentProviderProps {
  children: React.ReactNode;
  initialExp: number;
}

export default function EnvironmentProvider({ children, initialExp }: EnvironmentProviderProps) {
  const [exp, setExp] = useState(initialExp);

  const baseTreeRef = useRef<Tree>(null);
  const grassRef = useRef<Grass>(null);
  const [isReady, setIsReady] = useState(false);

  const increaseExp = useCallback(
    (amount: number) => {
      const newExp = exp + amount;
      setExp(newExp);

      const baseTree = baseTreeRef.current;
      const grass = grassRef.current;

      if (!baseTree || !grass) return;

      baseTree.queueGrowthFromExp(newExp);
      const targetGrassAmount = calculateGrassAmount(newExp);
      grass.setGrassAmount(targetGrassAmount);
    },
    [exp]
  );

  const value: EnvironmentContextValue = {
    exp,
    setExp,
    increaseExp,
    baseTreeRef,
    grassRef,
    isReady,
    setIsReady,
  };

  return <EnvironmentContext.Provider value={value}>{children}</EnvironmentContext.Provider>;
}
