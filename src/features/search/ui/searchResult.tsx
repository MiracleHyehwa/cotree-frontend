import { useSearchParams } from "react-router-dom";
import { sampleProductMock } from "@/features/product/mocks/sampleProductMock";
import { ProductCard } from "@/features/product/ui/variants";

export default function SearchResult() {
  const [params] = useSearchParams();
  const keyword = params.get("keyword")?.trim() ?? "";

  const filtered = sampleProductMock.filter((product) => product.name.toLowerCase().includes(keyword.toLowerCase()));

  return (
    <ProductCard.List products={filtered}>
      <ProductCard.Grid />
    </ProductCard.List>
  );
}
