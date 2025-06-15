export const genderOptions = [
  { value: "M", label: "남성" },
  { value: "F", label: "여성" },
] as const;

export const ageOptions = [
  { value: "10s", label: "10대" },
  { value: "20s", label: "20대" },
  { value: "30s", label: "30대" },
  { value: "40s", label: "40대" },
  { value: "50s", label: "50대" },
  { value: "60s", label: "60대 이상" },
] as const;

export type Gender = (typeof genderOptions)[number]["value"];
export type AgeRange = (typeof ageOptions)[number]["value"];
