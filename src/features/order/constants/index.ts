export const ORDER_STATUS_MAP = {
  PENDING: "주문대기",
  PAID: "결제완료",
  DELIVERED: "배송완료",
  ALL: "ALL",
} as const;

export type OrderStatusKey = keyof typeof ORDER_STATUS_MAP;
