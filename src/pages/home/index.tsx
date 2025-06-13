import { CommonLayout } from "@/shared/layout";
import {
  HomeBannerSwiper,
  HomeCategorySwiper,
  HomeCategorySwiperSkeleton,
  HomeEcoProductSwiper,
  HomeEcoProductSwiperSkeleton,
  HomeRecommendedProductSection,
} from "@/pages/home/sections";
import { TabNavigation } from "@/shared/tabs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ProductCard } from "@/features/product/ui/variants";
import { ErrorFallback } from "@/shared/components";

export default function HomePage() {
  return (
    <CommonLayout withBottomNav>
      <TabNavigation />
      <HomeBannerSwiper />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<HomeCategorySwiperSkeleton />}>
          <HomeCategorySwiper />
        </Suspense>
        <Suspense fallback={<HomeEcoProductSwiperSkeleton />}>
          <HomeEcoProductSwiper />
        </Suspense>
        <Suspense fallback={<ProductCard.GridSkeleton />}>
          <HomeRecommendedProductSection />
        </Suspense>
      </ErrorBoundary>
    </CommonLayout>
  );
}
