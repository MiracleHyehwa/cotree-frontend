import { ProductCardList } from "@/entities/product/ui";
import { ProductCategoryFilterTabs } from "@/features/product/ui";
import { CommonLayout } from "@/shared/layout";

export default function CategoryPage() {
  return (
    <CommonLayout>
      <ProductCategoryFilterTabs />
      <ProductCardList />
    </CommonLayout>
  );
}
