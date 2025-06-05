import { CommonLayout } from "@/shared/layout";
import {
  HomeBannerSwiper,
  HomeCategorySwiper,
  HomeEcoBrandSwiper,
  HomeRecommendedProductSection,
} from "@/pages/home/sections";

import TabNavigation from "@/widgets/tab/tabNavigation";

export default function HomePage() {
  return (
    <CommonLayout>
      <TabNavigation />
      <HomeBannerSwiper />
      <HomeCategorySwiper />
      <HomeEcoBrandSwiper />
      <HomeRecommendedProductSection />
    </CommonLayout>
  );
}
