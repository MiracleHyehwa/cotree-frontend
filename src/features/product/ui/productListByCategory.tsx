import { useProductsByCategory } from "@/entities/product/api/hooks";
import { useInfiniteScroll } from "@/shared/hooks";
import { ProductCard } from "./variants";
import { Spinner } from "@/shared/components/ui/spinner";

interface ProductListByCategoryProps {
  categoryId: string;
}

export default function ProductListByCategory({ categoryId }: ProductListByCategoryProps) {
  const validCategoryId = categoryId || "0";

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useProductsByCategory(validCategoryId);
  const { ref } = useInfiniteScroll({ fetchNextPage, hasNextPage, isFetchingNextPage });

  const products = data?.pages.flat() ?? [];

  return (
    <div className="w-full max-w-limit px-4">
      <ProductCard.List key={validCategoryId} products={products}>
        <ProductCard.Grid />
      </ProductCard.List>
      <div ref={ref} className="h-12" />
      {isFetchingNextPage && <Spinner />}
    </div>
  );
}
