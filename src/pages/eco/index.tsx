import { Suspense } from "react";
import { ProductCard } from "@/features/product/ui/variants";
import { ErrorFallback } from "@/shared/components";
import { CommonLayout } from "@/shared/layout";
import { TabNavigation } from "@/shared/tabs";
import { ErrorBoundary } from "react-error-boundary";
import { EcoProductList } from "@/features/product/ui";

export default function EcoPage() {
  return (
    <CommonLayout withBottomNav title="친환경">
      <TabNavigation />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="w-full max-w-limit px-4">
          <Suspense fallback={<ProductCard.HighlightedSkeleton />}>
            <EcoProductList />
          </Suspense>
        </div>
      </ErrorBoundary>
    </CommonLayout>
  );
}
