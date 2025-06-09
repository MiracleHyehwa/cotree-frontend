/** 나무 껍질 종류 */
export const BarkType = {
  Oak: "oak",
  Birch: "birch",
  Pine: "pine",
  Willow: "willow",
} as const;
export type BarkType = (typeof BarkType)[keyof typeof BarkType];

/** 잎의 billboard 방식 */
export const Billboard = {
  Double: "double",
  Single: "single", // 필요 시
} as const;
export type Billboard = (typeof Billboard)[keyof typeof Billboard];

/** 잎 종류 */
export const LeafType = {
  Oak: "oak",
  Ash: "ash",
  Pine: "pine",
  Aspen: "aspen",
} as const;
export type LeafType = (typeof LeafType)[keyof typeof LeafType];

/** 나무 타입 */
export const TreeType = {
  Deciduous: "deciduous", // 낙엽수
  Evergreen: "evergreen", // 침엽수
} as const;

export type TreeType = (typeof TreeType)[keyof typeof TreeType];
