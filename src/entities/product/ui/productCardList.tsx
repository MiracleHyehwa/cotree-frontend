import { sampleProductMock } from "../mocks/sampleProductMock";
import { ProductCard } from "@/entities/product/ui";
import { Product } from "@/entities/product/model";

export default function ProductCardList() {
  const products: Product[] = sampleProductMock;

  return (
    <div className="w-full max-w-limit grid grid-cols-2 gap-4 px-4 py-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
