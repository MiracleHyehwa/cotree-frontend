import { Navigate, useParams } from "react-router-dom";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/shared/components";
import { HeaderBackLayout } from "@/shared/layout";
import { OrderDetailViewSkeleton } from "@/features/order/ui";
import OrderDetailView from "./orderDetailView";
import { OrderApiError } from "@/shared/lib/api/errors";

export default function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();

  if (!orderId) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <HeaderBackLayout>
      <ErrorBoundary
        fallbackRender={({ error }) => {
          if (error instanceof OrderApiError && error.code === "OR005") {
            return <Navigate to="/forbidden" replace />;
          }
          if (error instanceof OrderApiError && error.code === "OR003") {
            return <Navigate to="/not-found" replace />;
          }
          return <ErrorFallback error={error} resetErrorBoundary={() => window.location.reload()} />;
        }}
      >
        <Suspense fallback={<OrderDetailViewSkeleton />}>
          <OrderDetailView orderId={orderId} />
        </Suspense>
      </ErrorBoundary>
    </HeaderBackLayout>
  );
}
