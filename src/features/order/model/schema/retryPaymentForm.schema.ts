import { z } from "zod";

export const retryPaymentSchema = z.object({
  cardNumber: z.string().min(12, "카드 번호를 정확히 입력하세요"),
  bank: z.string().min(1, "카드를 선택하세요"),
});

export type RetryPaymentFormValues = z.infer<typeof retryPaymentSchema>;
