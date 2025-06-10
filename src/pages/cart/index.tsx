import { Suspense } from "react";
import { HeaderHomeLayout } from "@/shared/layout";
import { CartSkeleton } from "@/features/cart/ui";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/shared/components";
import CartView from "./cartView";

export default function CartPage() {
  return (
    <HeaderHomeLayout title="장바구니">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<CartSkeleton />}>
          <CartView />
        </Suspense>
      </ErrorBoundary>
    </HeaderHomeLayout>
  );
}
