import { Suspense } from "react";
import { CommonLayout } from "@/shared/layout";
import { MyPageSkeleton } from "@/features/myPage/ui";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/shared/components";
import MyPageView from "./myPageView";

export default function MyPage() {
  return (
    <CommonLayout title="마이페이지" withBottomNav>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<MyPageSkeleton />}>
          <MyPageView />
        </Suspense>
      </ErrorBoundary>
    </CommonLayout>
  );
}
