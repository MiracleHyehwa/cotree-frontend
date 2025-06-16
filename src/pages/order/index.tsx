import { Suspense } from "react";
import { OrderHistoryProvider } from "@/features/order/context";
import { OrderStatusContent, OrderStatusList, OrderStatusListSkeleton } from "@/features/order/ui";
import OnlyHeaderBackLayout from "@/shared/layout/onlyHeaderBackLayout";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/shared/components";

export default function OrderHistoryPage() {
  return (
    <OrderHistoryProvider>
      <OnlyHeaderBackLayout title="주문/결제 내역">
        <OrderStatusContent>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <OrderStatusContent.When status="ALL">
              <Suspense fallback={<OrderStatusListSkeleton />}>
                <OrderStatusList status="ALL" />
              </Suspense>
            </OrderStatusContent.When>
            <OrderStatusContent.When status="PENDING">
              <Suspense fallback={<OrderStatusListSkeleton />}>
                <OrderStatusList status="PENDING" />
              </Suspense>
            </OrderStatusContent.When>
            <OrderStatusContent.When status="PAID">
              <Suspense fallback={<OrderStatusListSkeleton />}>
                <OrderStatusList status="PAID" />
              </Suspense>
            </OrderStatusContent.When>
          </ErrorBoundary>
        </OrderStatusContent>
      </OnlyHeaderBackLayout>
    </OrderHistoryProvider>
  );
}
