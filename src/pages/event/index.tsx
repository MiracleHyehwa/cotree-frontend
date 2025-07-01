import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { EventProductList } from "@/features/product/ui";
import { ProductCard } from "@/features/product/ui/variants";
import { ErrorFallback } from "@/shared/components";
import { CommonLayout } from "@/shared/layout";
import { TabNavigation } from "@/shared/tabs";

export default function EventPage() {
  return (
    <CommonLayout title="특가 할인">
      <TabNavigation />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="w-full max-w-limit px-4">
          <Suspense fallback={<ProductCard.HighlightedSkeleton />}>
            <EventProductList />
          </Suspense>
        </div>
      </ErrorBoundary>
    </CommonLayout>
  );
}
