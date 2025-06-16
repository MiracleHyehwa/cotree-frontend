import { MAX_EXP } from "@/entities/environment/constants";

export const getTreeParametersFromExp = (exp: number) => {
  const clampedExp = Math.min(exp, MAX_EXP);
  const normalized = clampedExp / MAX_EXP;

  const ratio = 0.2 + 0.8 * Math.pow(normalized, 0.8);

  const maxDepth = 12;
  const minDepth = 4;

  const depth = Math.floor(minDepth + (maxDepth - minDepth) * ratio);
  const branchLengthScale = 0.8 + 0.4 * ratio;
  const branchWidthScale = 0.7 + 0.3 * ratio;

  return { depth, branchLengthScale, branchWidthScale };
};
