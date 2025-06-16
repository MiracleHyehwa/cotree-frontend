import { OrderHistoryProvider } from "@/features/order/context";
import { OrderStatusContent, OrderStatusList } from "@/features/order/ui";
import OnlyHeaderBackLayout from "@/shared/layout/onlyHeaderBackLayout";

export default function OrderHistoryPage() {
  return (
    <OrderHistoryProvider>
      <OnlyHeaderBackLayout title="주문/결제 내역">
        <OrderStatusContent>
          <OrderStatusContent.When status="ALL">
            <OrderStatusList status="ALL" />
          </OrderStatusContent.When>
          <OrderStatusContent.When status="PENDING">
            <OrderStatusList status="PENDING" />
          </OrderStatusContent.When>
          <OrderStatusContent.When status="PAID">
            <OrderStatusList status="PAID" />
          </OrderStatusContent.When>
        </OrderStatusContent>
      </OnlyHeaderBackLayout>
    </OrderHistoryProvider>
  );
}
