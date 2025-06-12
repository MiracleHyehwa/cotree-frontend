export const GreenPointError = {
  GP001: {
    code: "GP001",
    devMessage: "사용 가능한 포인트가 부족함",
    message: "포인트가 부족합니다.",
  },
  GP002: {
    code: "GP002",
    devMessage: "포인트 로그 저장 실패",
    message: "포인트 처리 중 문제가 발생했습니다.",
  },
} as const;

export type GreenPointErrorCode = keyof typeof GreenPointError;
