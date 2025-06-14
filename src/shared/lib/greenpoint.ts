const GREEN_POINT_RATE = 0.01;

export const calculateGreenReward = (price: number, isGreen: "Y" | "N"): number => {
  return isGreen === "Y" ? Math.floor(price * GREEN_POINT_RATE) : 0;
};
