import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { EventProductList } from "@/features/product/ui";
import { ProductCard } from "@/features/product/ui/variants";
import { ErrorFallback } from "@/shared/components";
import { CommonLayout } from "@/shared/layout";
import { TabNavigation } from "@/shared/tabs";
import { EventUnavailable } from "@/features/event/ui";

function isAllowedTime() {
  const hour = new Date().getHours();
  return hour === 19 || hour === 20;
}

export default function EventPage() {
  const allowed = isAllowedTime();

  return (
    <CommonLayout title="특가 할인" withBottomNav>
      <TabNavigation />
      {allowed ? (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<ProductCard.HighlightedSkeleton />}>
            <EventProductList />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <EventUnavailable />
      )}
    </CommonLayout>
  );
}
