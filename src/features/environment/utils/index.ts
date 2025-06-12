import { MAX_EXP, MAX_LEVEL } from "@/entities/environment/constants";

export const calculateGrassAmount = (exp: number) => {
  const maxGrass = 20000;

  const ratio = Math.min(exp / MAX_EXP, 1);
  const curvedRatio = Math.pow(ratio, 0.8);
  return Math.floor(500 + (maxGrass - 500) * curvedRatio);
};

export const calculateExpPercent = (exp: number): number => {
  if (exp >= MAX_EXP) return 100;

  return ((exp % 1000) / 1000) * 100;
};
export const calculateLevel = (exp: number): number => {
  return Math.min(Math.floor(exp / 1000) + 1, MAX_LEVEL);
};
