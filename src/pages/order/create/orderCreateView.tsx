import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  OrderAgreementConfirmationCheckbox,
  OrderPaymentActionBar,
  OrderPaymentForm,
  OrderProductSummary,
  OrderRecipientFields,
  OrderShippingAddressField,
  OrderShippingAddressPostcode,
} from "@/features/order/ui";
import { FormProvider, useForm } from "react-hook-form";
import { orderFormSchema, OrderFormValues } from "@/features/order/model/schema";
import { useNavigate } from "react-router-dom";
import { clearOrderSession, getOrderSession, shouldRedirectOrderPage } from "@/entities/order/lib";
import { useCreateOrder } from "@/entities/order/api/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { cartKeys } from "@/entities/cart/api/queryOptions";

const DISCOUNT = 0;
const USED_POINT = 0;
const SHIPPING_FEE = 0;

export default function OrderCreateView() {
  const { mutate: submitOrder } = useCreateOrder();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);
  const products = getOrderSession();
  const productTotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const total = productTotal - DISCOUNT - USED_POINT + SHIPPING_FEE;

  const methods = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      cardNumber: "",
      receiverName: "",
      receiverTel: "",
      destination: "",
      bankName: "",
      request: "",
      orderItems: products.map((p) => ({
        itemId: p.itemId,
        quantity: p.quantity,
      })),
    },
  });

  const onSubmit = (data: OrderFormValues) => {
    const { ...rest } = data;

    submitOrder(rest, {
      onSuccess: (orderNumber) => {
        clearOrderSession();
        queryClient.invalidateQueries({ queryKey: cartKeys.getCartItems });
        queryClient.invalidateQueries({ queryKey: cartKeys.getCartItemCount });
        navigate(`/order/completed/${orderNumber}`, {
          state: { from: "order-success" },
        });
      },
    });
  };

  useEffect(() => {
    if (shouldRedirectOrderPage()) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <FormProvider {...methods}>
      <div className="w-full max-w-limit mx-auto px-4 py-6 space-y-8">
        <OrderShippingAddressField>
          {({ open, setOpen, onSelect }) => (
            <OrderShippingAddressPostcode open={open} setOpen={setOpen} onSelect={onSelect} />
          )}
        </OrderShippingAddressField>
        <OrderRecipientFields />
        <OrderPaymentForm.RequestField />
        <OrderProductSummary products={products} />
        <OrderPaymentForm title="결제수단">
          <OrderPaymentForm.TypeOptions value="general" disabled />
          <OrderPaymentForm.MethodSelector
            methods={[
              { label: "신용카드", disabled: false, selected: true },
              { label: "간편결제", disabled: true },
              { label: "가상계좌", disabled: true },
              { label: "휴대폰결제", disabled: true },
              { label: "실시간 계좌이체", disabled: true },
            ]}
          />
          <OrderPaymentForm.CardFields />
        </OrderPaymentForm>
        <OrderAgreementConfirmationCheckbox checked={isChecked} onChange={setIsChecked} />
      </div>

      <OrderPaymentActionBar totalAmount={total} disabled={!isChecked} onClick={methods.handleSubmit(onSubmit)} />
    </FormProvider>
  );
}
