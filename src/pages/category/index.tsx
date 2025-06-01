import { CategoryTabsSwiper } from "@/widgets/category";
import { ProductCardList } from "@/entities/product/ui";
import { CommonLayout } from "@/shared/layout";

export default function CategoryPage() {
  return (
    <CommonLayout>
      <CategoryTabsSwiper />
      <ProductCardList />
    </CommonLayout>
  );
}
