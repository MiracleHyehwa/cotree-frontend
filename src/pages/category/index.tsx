import { ProductCategoryFilterTabs } from "@/features/product/ui";
import { CommonLayout } from "@/shared/layout";
import { ProductCard } from "@/features/product/ui/variants";
import { sampleProductMock } from "@/features/product/mocks/sampleProductMock";

export default function CategoryPage() {
  return (
    <CommonLayout withBottomNav title="카테고리">
      <ProductCategoryFilterTabs />
      <div className="w-full max-w-limit px-4">
        <ProductCard.List products={sampleProductMock}>
          <ProductCard.Grid />
        </ProductCard.List>
      </div>
    </CommonLayout>
  );
}
