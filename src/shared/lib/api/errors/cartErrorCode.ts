export const CartError = {
  SB001: {
    code: "SB001",
    devMessage: "장바구니를 찾을 수 없습니다. (memberId로 shopping_basket 조회 실패)",
    message: "장바구니를 불러올 수 없어요.",
  },
  SB002: {
    code: "SB002",
    devMessage: "상품 ID로 item 조회 실패",
    message: "상품 정보를 찾을 수 없어요.",
  },
  SB003: {
    code: "SB003",
    devMessage: "이미 장바구니에 존재하는 itemId",
    message: "이미 장바구니에 담긴 상품이에요.",
  },
  SB004: {
    code: "SB004",
    devMessage: "itemId가 null 또는 0 이하",
    message: "상품 정보가 잘못되었어요.",
  },
  SB005: {
    code: "SB005",
    devMessage: "수량이 0 이하 혹은 null",
    message: "수량을 다시 확인해주세요.",
  },
  SB006: {
    code: "SB006",
    devMessage: "해당 상품이 사용자의 장바구니에 존재하지 않음",
    message: "장바구니에 해당 상품이 없어요.",
  },
  SB007: {
    code: "SB007",
    devMessage: "INSERT 실패: basket_item에 상품 추가 실패",
    message: "상품을 장바구니에 담지 못했어요.",
  },
  SB008: {
    code: "SB008",
    devMessage: "UPDATE 실패: 수량 변경 실패",
    message: "수량 변경이 실패했어요.",
  },
  SB009: {
    code: "SB009",
    devMessage: "DELETE 실패: basket_item 삭제 실패",
    message: "상품 삭제가 실패했어요.",
  },
  SB010: {
    code: "SB010",
    devMessage: "basketItemId로 basket_item 조회 결과 없음",
    message: "장바구니 항목을 찾을 수 없어요.",
  },
  SB011: {
    code: "SB011",
    devMessage: "basketItemId가 null 또는 0 이하",
    message: "잘못된 요청입니다.",
  },
} as const;

export type CartErrorCode = keyof typeof CartError;
