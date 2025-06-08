import { ProductCategoryFilterTabs } from "@/features/product/ui";
import { CommonLayout } from "@/shared/layout";
import { ProductCard } from "@/features/product/ui/variants";
import { sampleProductMock } from "@/features/product/mocks/sampleProductMock";

export default function CategoryPage() {
  return (
    <CommonLayout withBottomNav title="카테고리">
      <ProductCategoryFilterTabs />
      <ProductCard.List products={sampleProductMock}>
        <ProductCard.Featured />
      </ProductCard.List>
    </CommonLayout>
  );
}
