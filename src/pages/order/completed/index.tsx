import { CommonLayout } from "@/shared/layout";
import OrderCompletedView from "./orderCompletedView";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { OrderCompletedErrorFallback, OrderCompletedSkeleton } from "@/features/order/ui";

export default function OrderCompletedPage() {
  return (
    <CommonLayout title="주문 완료">
      <ErrorBoundary FallbackComponent={OrderCompletedErrorFallback}>
        <Suspense fallback={<OrderCompletedSkeleton />}>
          <OrderCompletedView />
        </Suspense>
      </ErrorBoundary>
    </CommonLayout>
  );
}
