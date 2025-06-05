import { ProductCard } from "@/entities/product/ui";
import { Product } from "@/entities/product/model";
import { sampleProductMock } from "@/entities/product/mocks/sampleProductMock";

export default function HomeRecommendedProductSection() {
  const products: Product[] = sampleProductMock.slice(0, 4);

  return (
    <section className="w-full max-w-limit mx-auto px-4 py-6">
      <h2 className="text-lg font-bold mb-4">🔥 오늘의 추천 상품</h2>
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
