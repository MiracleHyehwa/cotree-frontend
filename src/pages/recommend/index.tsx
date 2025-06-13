import { CommonLayout } from "@/shared/layout";
import { TabNavigation } from "@/shared/tabs";
import { Suspense } from "react";
import { ProductCard } from "@/features/product/ui/variants";
import RecommendProductList from "@/features/product/ui/recommendProductList";

export default function RecommendPage() {
  return (
    <CommonLayout withBottomNav title="추천상품">
      <TabNavigation />
      <Suspense fallback={<ProductCard.HorizontalSkeleton />}>
        <RecommendProductList />
      </Suspense>
    </CommonLayout>
  );
}
