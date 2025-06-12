import { Suspense } from "react";
import { OnlyHeaderBackLayout } from "@/shared/layout";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/shared/components";
import { PointHistorySkeleton } from "@/features/myPage/ui";
import PointHistoryView from "./pointHistoryView";

export default function PointHistoryPage() {
  return (
    <OnlyHeaderBackLayout title="포인트 적립 내역">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<PointHistorySkeleton />}>
          <PointHistoryView />
        </Suspense>
      </ErrorBoundary>
    </OnlyHeaderBackLayout>
  );
}
