import { sampleProductMock } from "@/features/product/mocks/sampleProductMock";
import { ProductCard } from "@/features/product/ui/variants";
import { CommonLayout } from "@/shared/layout";
import { TabNavigation } from "@/shared/tabs";

export default function RecommendPage() {
  return (
    <CommonLayout withBottomNav title="추천상품">
      <TabNavigation />
      <div className="w-full max-w-limit px-4">
        <ProductCard.List products={sampleProductMock}>
          <ProductCard.Horizontal />
        </ProductCard.List>
      </div>
    </CommonLayout>
  );
}
