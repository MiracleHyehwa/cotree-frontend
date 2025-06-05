import { sampleProductMock } from "../mocks/sampleProductMock";
import { ProductCategory } from "@/features/product/context";
import { Product } from "../model";
import ProductCard from "./productCard";

interface ProductCardListProps {
  category?: ProductCategory;
}

export default function ProductCardList({ category }: ProductCardListProps) {
  console.log(category);
  const products: Product[] = sampleProductMock;

  return (
    <div className="w-full max-w-limit grid grid-cols-2 gap-4 px-4 py-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
