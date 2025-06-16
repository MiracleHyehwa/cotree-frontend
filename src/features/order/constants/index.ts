export const ORDER_STATUS_MAP = {
  ALL: "전체",
  PENDING: "주문대기",
  PAID: "결제완료",
} as const;

export type OrderStatusKey = keyof typeof ORDER_STATUS_MAP;
