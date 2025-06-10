export const CartError = {
  SB001: { code: "SB001", message: "장바구니를 찾을 수 없습니다." },
  SB002: { code: "SB002", message: "상품을 찾을 수 없습니다." },
  SB003: { code: "SB003", message: "이미 장바구니에 담긴 상품입니다." },
  SB004: { code: "SB004", message: "유효하지 않은 상품 ID입니다." },
  SB005: { code: "SB005", message: "유효하지 않은 수량입니다." },
  SB006: { code: "SB006", message: "해당 상품은 장바구니에 없습니다." },
  SB007: { code: "SB007", message: "상품 추가에 실패했습니다." },
  SB008: { code: "SB008", message: "수량 변경에 실패했습니다." },
  SB009: { code: "SB009", message: "상품 삭제에 실패했습니다." },
} as const;

export type CartErrorCode = keyof typeof CartError;
