// features/search/ui/search-result.tsx

import { useSearchParams } from "react-router-dom";
import { ProductCard } from "@/entities/product/ui";
import { Product } from "@/entities/product/model";
import { sampleProductMock } from "@/entities/product/mocks/sampleProductMock";

export default function SearchResult() {
  const [params] = useSearchParams();
  const keyword = params.get("keyword")?.trim() ?? "";

  if (!keyword) return null;

  const filtered: Product[] = sampleProductMock.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <>
      <div className="w-full max-w-limit space-y-4">
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground">일치하는 결과가 없습니다.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
