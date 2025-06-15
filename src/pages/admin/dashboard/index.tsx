import { Suspense } from "react";
import {
  SectionCards,
  ChartAreaInteractive,
  ChartAreaInteractiveSkeleton,
  SectionCardsSkeleton,
} from "@/features/admin/ui";

export default function AdminDashBoardPage() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <Suspense fallback={<SectionCardsSkeleton />}>
          <SectionCards />
        </Suspense>
        <div className="px-4 lg:px-6">
          <Suspense fallback={<ChartAreaInteractiveSkeleton />}>
            <ChartAreaInteractive />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
