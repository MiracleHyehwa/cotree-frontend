import { z } from "zod";

export const orderFormSchema = z.object({
  receiverName: z.string().min(1, "이름을 입력해주세요"),
  receiverTel: z
    .string()
    .min(1, "전화번호를 입력해주세요")
    .regex(/^010\d{8}$/, "전화번호 형식이 올바르지 않습니다"),
  destination: z.string().min(1, "배송지를 입력해주세요"),
  cardNumber: z.string().regex(/^\d{16}$/, "카드 번호는 숫자 16자리여야 합니다"),
  bankName: z.string().min(1, "은행명을 입력해주세요"),
  request: z.string().optional(),
  orderItems: z
    .array(
      z.object({
        itemId: z.number(),
        quantity: z.number().min(1, "수량은 1 이상이어야 합니다"),
      })
    )
    .min(1, "주문 상품이 없습니다"),
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;
