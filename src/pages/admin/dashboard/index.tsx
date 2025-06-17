import { Suspense, useEffect } from "react";
import { SectionCards, SectionCardsSkeleton } from "@/features/admin/ui";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import { AreaInteractiveChart, AreaInteractiveChartSkeleton } from "@/features/admin/ui/charts";
import AdminErrorFallback from "@/features/admin/ui/adminErrorFallback";

export default function AdminDashBoardPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  return (
    <ErrorBoundary FallbackComponent={AdminErrorFallback}>
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <Suspense fallback={<SectionCardsSkeleton />}>
            <SectionCards />
          </Suspense>
          <div className="px-4 lg:px-6">
            <Suspense fallback={<AreaInteractiveChartSkeleton />}>
              <AreaInteractiveChart />
            </Suspense>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
