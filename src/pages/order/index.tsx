import { OrderHistoryProvider } from "@/features/order/context";
import { OrderStatusContent, OrderStatusList } from "@/features/order/ui";
import { HeaderBackLayout } from "@/shared/layout";

export default function OrderHistoryPage() {
  return (
    <OrderHistoryProvider>
      <HeaderBackLayout>
        <OrderStatusContent>
          <OrderStatusContent.When status="PENDING">
            <OrderStatusList status="PENDING" />
          </OrderStatusContent.When>
          <OrderStatusContent.When status="PAID">
            <OrderStatusList status="PAID" />
          </OrderStatusContent.When>
          <OrderStatusContent.When status="DELIVERED">
            <OrderStatusList status="DELIVERED" />
          </OrderStatusContent.When>
          <OrderStatusContent.When status="ALL">
            <OrderStatusList status="ALL" />
          </OrderStatusContent.When>
        </OrderStatusContent>
      </HeaderBackLayout>
    </OrderHistoryProvider>
  );
}
