import { useTodayProducts } from "@/entities/product/api/hooks";
import { ProductCard } from "@/features/product/ui/variants";

export default function HomeTodayProductSection() {
  const { data: ecoProducts } = useTodayProducts();

  return (
    <section className="w-full max-w-limit mx-auto px-4 py-6">
      <h2 className="text-lg font-bold">🔥 오늘의 상품</h2>
      <ProductCard.List products={ecoProducts}>
        <ProductCard.Grid />
      </ProductCard.List>
    </section>
  );
}
