export const OrderError = {
  OR000: {
    code: "OR000",
    devMessage: "주문 등록 실패",
    message: "주문에 실패했습니다. 다시 시도해주세요.",
  },
  OR001: {
    code: "OR001",
    devMessage: "주문 상품 등록 실패",
    message: "주문 상품 처리 중 문제가 발생했습니다.",
  },
  OR002: {
    code: "OR002",
    devMessage: "주문 상태 변경 실패",
    message: "주문 상품 처리 중 문제가 발생했습니다.",
  },
} as const;

export type OrderErrorCode = keyof typeof OrderError;
