import RecommendProductList from "@/features/product/ui/recommendProductList";
import { CommonLayout } from "@/shared/layout";
import { TabNavigation } from "@/shared/tabs";
import { Suspense } from "react";

export default function RecommendPage() {
  return (
    <CommonLayout withBottomNav title="추천상품">
      <TabNavigation />
      <Suspense>
        <RecommendProductList />
      </Suspense>
    </CommonLayout>
  );
}
