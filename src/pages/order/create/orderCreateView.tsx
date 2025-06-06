import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderPaymentMethodButtonList, OrderPaymentTypeRadioGroup, OrderProductListSection } from "@/entities/order/ui";
import {
  OrderAgreementConfirmationCheckbox,
  OrderPaymentActionBar,
  OrderPaymentCardInformationFields,
  OrderRecipientFields,
  OrderShippingAddressPostcode,
  OrderShippingAddressRegistrationSection,
} from "@/features/order/ui";
import { FormProvider, useForm } from "react-hook-form";
import { orderFormSchema, OrderFormValues } from "@/features/order/model/schema";
import { useNavigate } from "react-router-dom";

const DISCOUNT = 0;
const USED_POINT = 0;
const SHIPPING_FEE = 0;

const products = [
  {
    id: 1,
    name: "친환경 국산 사과즙 100%",
    image: "https://dummyimage.com/120x160/ffffe0/000&text=사과즙",
    brand: "자연애",
    option: "1박스 / 30포",
    price: 12000,
    quantity: 1,
  },
  {
    id: 2,
    name: "무농약 유기농 바나나",
    image: "https://dummyimage.com/120x160/fffae0/000&text=바나나",
    brand: "그린팜",
    option: "1kg / 봉지",
    price: 5800,
    quantity: 2,
  },
];

export default function OrderCreateView() {
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);

  const productTotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const total = productTotal - DISCOUNT - USED_POINT + SHIPPING_FEE;

  const methods = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      cardNumber: "",
      recipientPhone: "",
      cardType: "",
      installment: "1",
      shippingAddress: "",
      products: products.map((p) => ({
        id: p.id,
        quantity: p.quantity,
      })),
      totalAmount: total,
    },
  });

  const onSubmit = (data: OrderFormValues) => {
    const { recipientName, recipientPhone, cardNumber, shippingAddress, products, totalAmount } = data;

    const payload = {
      recipientName,
      recipientPhone,
      cardNumber,
      shippingAddress,
      products,
      totalAmount,
    };
    console.log(`백엔드 데이터 전송 : ${payload}`);
    navigate("/order/completed/1");
  };

  return (
    <FormProvider {...methods}>
      <div className="w-full max-w-limit mx-auto px-4 py-6 space-y-8">
        <OrderShippingAddressRegistrationSection>
          {({ open, setOpen, onSelect }) => (
            <OrderShippingAddressPostcode open={open} setOpen={setOpen} onSelect={onSelect} />
          )}
        </OrderShippingAddressRegistrationSection>
        <OrderRecipientFields />
        <OrderProductListSection products={products} />
        <section className="space-y-4">
          <h2 className="font-semibold text-lg">결제수단</h2>
          <OrderPaymentTypeRadioGroup value="general" disabled={true} />
          <OrderPaymentMethodButtonList
            methods={[
              { label: "신용카드", disabled: false, selected: true },
              { label: "간편결제", disabled: true },
              { label: "가상계좌", disabled: true },
              { label: "휴대폰결제", disabled: true },
              { label: "실시간 계좌이체", disabled: true },
            ]}
          />

          <OrderPaymentCardInformationFields />
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-lg">주문 정보 확인</h2>
          <OrderAgreementConfirmationCheckbox checked={isChecked} onChange={setIsChecked} />
        </section>
      </div>

      <OrderPaymentActionBar totalAmount={total} disabled={!isChecked} onClick={methods.handleSubmit(onSubmit)} />
    </FormProvider>
  );
}
