export const calculateGrassAmount = (exp: number) => {
  const maxGrass = 20000;
  const maxExp = 10000;

  const ratio = Math.min(exp / maxExp, 1);
  const curvedRatio = Math.pow(ratio, 0.8);
  return Math.floor(500 + (maxGrass - 500) * curvedRatio);
};

export const calculateExpPercent = (exp: number): number => {
  return ((exp % 1000) / 1000) * 100;
};
