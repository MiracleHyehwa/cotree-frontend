import { z } from "zod";

export const orderFormSchema = z.object({
  cardNumber: z.string().min(16, "카드 번호는 16자리를 입력해주세요"),
  cardType: z.string().min(1, "카드사를 선택해주세요"),
  installment: z.string().min(1, "할부 개월을 선택해주세요"),
  shippingAddress: z.string().min(1, "배송지를 입력해주세요"),
  products: z
    .array(
      z.object({
        id: z.number(),
        quantity: z.number().min(1, "수량은 1 이상이어야 합니다"),
      })
    )
    .min(1, "주문 상품이 없습니다"),
  totalAmount: z.number().min(1, "총 결제 금액이 0원일 수 없습니다"),
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;
