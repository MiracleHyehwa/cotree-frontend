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
  OR003: {
    code: "OR003",
    devMessage: "주문 정보 없음",
    message: "해당 주문 정보를 찾을 수 없습니다.",
  },
  OR004: {
    code: "OR004",
    devMessage: "주문 상품 정보 없음",
    message: "주문한 상품 정보를 찾을 수 없습니다.",
  },
  OR005: {
    code: "OR005",
    devMessage: "잘못된 접근입니다.",
    message: "잘못된 접근입니다.",
  },
} as const;

export type OrderErrorCode = keyof typeof OrderError;
