import { CommonLayout } from "@/shared/layout";
import { HomeBannerSwiper, HomeCategorySwiper, HomeEcoBrandSwiper } from "@/widgets/home";

import TabNavigation from "@/widgets/tab/tabNavigation";

export default function HomePage() {
  return (
    <CommonLayout>
      <TabNavigation />
      <HomeBannerSwiper />
      <HomeCategorySwiper />
      <HomeEcoBrandSwiper />
    </CommonLayout>
  );
}
