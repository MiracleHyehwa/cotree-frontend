import {
  OrderPaymentCardInputFields,
  OrderPaymentMethodSelector,
  OrderPaymentRequestField,
  OrderPaymentTypeOptions,
} from "@/features/order/ui";

interface OrderPaymentFormProps {
  title: string;
  children: React.ReactNode;
}

export default function OrderPaymentForm({ title, children }: OrderPaymentFormProps) {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">{title}</h2>
      {children}
    </div>
  );
}

OrderPaymentForm.TypeOptions = function TypeOptions(props: React.ComponentProps<typeof OrderPaymentTypeOptions>) {
  return <OrderPaymentTypeOptions {...props} />;
};

OrderPaymentForm.MethodSelector = function MethodSelector(
  props: React.ComponentProps<typeof OrderPaymentMethodSelector>
) {
  return <OrderPaymentMethodSelector {...props} />;
};

OrderPaymentForm.CardFields = function CardFields() {
  return <OrderPaymentCardInputFields />;
};

OrderPaymentForm.RequestField = function RequestField() {
  return <OrderPaymentRequestField />;
};
