export const PaymentError = {
  PA000: {
    code: "PA000",
    devMessage: "결제 실패",
    message: "결제에 실패했습니다.",
  },
} as const;

export type PaymentErrorCode = keyof typeof PaymentError;
