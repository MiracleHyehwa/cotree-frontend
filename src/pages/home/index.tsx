import { CommonLayout } from "@/shared/layout";
import {
  HomeBannerSwiper,
  HomeCategorySwiper,
  HomeEcoBrandSwiper,
  HomeRecommendedProductSection,
} from "@/pages/home/sections";
import { TabNavigation } from "@/shared/tabs";

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
