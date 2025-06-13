export const categoryImageMap: Record<number, string> = {
  1: "fruit-veg",
  2: "crop",
  3: "fish",
  4: "meat",
  5: "rice",
  6: "side-dish",
  7: "sauce",
  8: "bread-cheeze",
  9: "snack",
  10: "nutrition",
};

export const getCategoryImageUrl = (categoryId: number): string => {
  const imageKey = categoryImageMap[categoryId];
  return `/category/${imageKey}.png`;
};
