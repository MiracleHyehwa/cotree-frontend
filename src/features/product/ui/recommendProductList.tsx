import { useEcoProductByPage } from "@/entities/product/api/hooks";
import { ProductCard } from "./variants";
import { useInfiniteScroll } from "@/shared/hooks";
import { Spinner } from "@/shared/components/ui/spinner";

export default function RecommendProductList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useEcoProductByPage();
  const { ref } = useInfiniteScroll({ fetchNextPage, hasNextPage, isFetchingNextPage });
  const ecoProducts = data?.pages.flat() ?? [];

  return (
    <div className="w-full max-w-limit px-4">
      <ProductCard.List products={ecoProducts}>
        <ProductCard.Horizontal />
      </ProductCard.List>
      <div ref={ref} className="h-12" />
      {isFetchingNextPage && <Spinner />}
    </div>
  );
}
