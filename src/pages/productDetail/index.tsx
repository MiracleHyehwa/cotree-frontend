import { HeaderBackLayout } from "@/shared/layout";
import ProductDetailView from "./productDetailView";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/shared/components";
import { ProductDetailSkeleton } from "@/features/product/ui";

export default function ProductDetailPage() {
  return (
    <HeaderBackLayout>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<ProductDetailSkeleton />}>
          <ProductDetailView />
        </Suspense>
      </ErrorBoundary>
    </HeaderBackLayout>
  );
}
