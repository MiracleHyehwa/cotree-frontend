export const ValidationError = {
  VE000: { message: "필수 항목이 누락되었습니다." },
} as const;

export type ValidationErrorCode = keyof typeof ValidationError;
