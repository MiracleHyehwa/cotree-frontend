import { sampleProductMock } from "@/features/product/mocks/sampleProductMock";
import { ProductCard } from "@/features/product/ui/variants";
import { CommonLayout } from "@/shared/layout";
import { TabNavigation } from "../home/sections";

export default function EcoPage() {
  return (
    <CommonLayout withBottomNav title="친환경">
      <TabNavigation />
      <div className="w-full max-w-limit px-4">
        <ProductCard.List products={sampleProductMock}>
          <ProductCard.Highlighted />
        </ProductCard.List>
      </div>
    </CommonLayout>
  );
}
