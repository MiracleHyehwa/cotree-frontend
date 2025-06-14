export const genderOptions = [
  { value: "M", label: "남성" },
  { value: "F", label: "여성" },
] as const;

export const ageOptions = [
  { value: "10", label: "10대" },
  { value: "20", label: "20대" },
  { value: "30", label: "30대" },
  { value: "40", label: "40대" },
  { value: "50", label: "50대" },
  { value: "60", label: "60대 이상" },
] as const;

export type Gender = (typeof genderOptions)[number]["value"];
export type AgeRange = (typeof ageOptions)[number]["value"];
