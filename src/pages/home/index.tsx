import { CommonLayout } from "@/shared/layout";
import {
  HomeBannerSwiper,
  HomeCategorySwiper,
  HomeEcoBrandSwiper,
  HomeRecommendedProductSection,
  TabNavigation,
} from "@/pages/home/sections";

export default function HomePage() {
  return (
    <CommonLayout withBottomNav>
      <TabNavigation />
      <HomeBannerSwiper />
      <HomeCategorySwiper />
      <HomeEcoBrandSwiper />
      <HomeRecommendedProductSection />
    </CommonLayout>
  );
}
