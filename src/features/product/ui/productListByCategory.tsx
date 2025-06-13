import { useProductsByCategory } from "@/entities/product/api/hooks";
import { useInfiniteScroll } from "@/shared/hooks";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "./variants";
import Spinner from "@/shared/components/ui/spinner";

export default function ProductListByCategory() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("type");
  const validCategoryId = categoryId || "1";

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useProductsByCategory(validCategoryId);
  const { ref } = useInfiniteScroll({ fetchNextPage, hasNextPage, isFetchingNextPage });

  const products = data?.pages.flat() ?? [];

  return (
    <div className="w-full max-w-limit px-4">
      <ProductCard.List key={validCategoryId} products={products}>
        <ProductCard.Grid />
      </ProductCard.List>
      <div ref={ref} className="h-8" />
      {isFetchingNextPage && <Spinner />}
    </div>
  );
}
