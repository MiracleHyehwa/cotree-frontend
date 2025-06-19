import { CommonLayout } from "@/shared/layout";
import OrderCompletedView from "./orderCompletedView";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { OrderCompletedErrorFallback, OrderCompletedSkeleton } from "@/features/order/ui";
import { Navigate } from "react-router-dom";
import { OrderApiError } from "@/shared/lib/api/errors";

export default function OrderCompletedPage() {
  return (
    <CommonLayout title="주문 완료">
      <ErrorBoundary
        fallbackRender={({ error }) => {
          if (error instanceof OrderApiError && error.code === "OR005") {
            return <Navigate to="/forbidden" replace />;
          }
          if (error instanceof OrderApiError && error.code === "OR003") {
            return <Navigate to="/not-found" replace />;
          }
          return <OrderCompletedErrorFallback error={error} />;
        }}
      >
        <Suspense fallback={<OrderCompletedSkeleton />}>
          <OrderCompletedView />
        </Suspense>
      </ErrorBoundary>
    </CommonLayout>
  );
}
