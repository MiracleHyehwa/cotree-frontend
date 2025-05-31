import CommonLayout from "@/shared/layout/commonLayout";
import HomeBannerSwiper from "@/widgets/home/homeBannerSwiper";
import HomeCategorySwiper from "@/widgets/home/homeCategorySwiper";
import HomeEcoBrandSwiper from "@/widgets/home/homeEcoBrandSwiper";
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
