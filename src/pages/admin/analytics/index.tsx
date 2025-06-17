import { AdminErrorFallback } from "@/features/admin/ui";
import {
  BarChartCustomLabel,
  BarChartStacked,
  BarChartStackedSkeleton,
  BarChartVertical,
  PieChartLabelListWithPurchaseCount,
} from "@/features/admin/ui/charts";
import BarChartCustomLabelSkeleton from "@/features/admin/ui/charts/barChartCustomLabelSkeleon";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function AdminAnalyticsPage() {
  return (
    <ErrorBoundary FallbackComponent={AdminErrorFallback}>
      <div className="@container/main flex flex-1 flex-col gap-2 px-4 lg:px-6 py-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Suspense fallback={<BarChartCustomLabelSkeleton />}>
              <BarChartCustomLabel />
            </Suspense>
            <Suspense fallback={<BarChartStackedSkeleton />}>
              <BarChartStacked />
            </Suspense>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BarChartVertical />
            <PieChartLabelListWithPurchaseCount />
            {/* <PieChartLabelList /> */}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
