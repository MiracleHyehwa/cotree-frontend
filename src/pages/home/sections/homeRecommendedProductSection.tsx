import { sampleProductMock } from "@/features/product/mocks/sampleProductMock";
import { ProductCard } from "@/features/product/ui/variants";

export default function HomeRecommendedProductSection() {
  return (
    <section className="w-full max-w-limit mx-auto px-4 py-6">
      <h2 className="text-lg font-bold">🔥 오늘의 추천 상품</h2>
      <ProductCard.List products={sampleProductMock}>
        <ProductCard.Grid />
      </ProductCard.List>
    </section>
  );
}
