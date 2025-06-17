import { useRecommendProducts } from "@/entities/product/api/hooks";
import { ProductCard } from "./variants";
import { toProductFromRecommendation } from "@/entities/product/lib/toProductFromRecommendtaion";

export default function RecommendProductList() {
  const { data: recommendations } = useRecommendProducts();
  const recommendProducts = recommendations.map(toProductFromRecommendation);

  return (
    <div className="w-full max-w-limit px-4">
      <ProductCard.List products={recommendProducts}>
        <ProductCard.Horizontal />
      </ProductCard.List>
    </div>
  );
}
