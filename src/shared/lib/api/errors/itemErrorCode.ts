export const ItemError = {
  IT000: {
    code: "IT000",
    devMessage: "재고 수량보다 많은 수 주문함",
    message: "재고 수량보다 많은 수를 주문할수 없습니다.",
  },
} as const;

export type ItemErrorCode = keyof typeof ItemError;
