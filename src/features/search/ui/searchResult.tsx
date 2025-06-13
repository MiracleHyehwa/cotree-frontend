import { useSearchParams } from "react-router-dom";
import { useSearchFilterContext } from "../hooks";
import { ProductCard } from "@/features/product/ui/variants";
import { useSearchedProducts } from "@/entities/product/api/hooks";
import { useInfiniteScroll } from "@/shared/hooks";
import Spinner from "@/shared/components/ui/spinner";

export default function SearchResult() {
  const { categoryId, isGreen } = useSearchFilterContext();
  const [params] = useSearchParams();
  const keyword = params.get("keyword")?.trim() ?? "";

  const category = categoryId ? parseInt(categoryId, 10) : 0;
  const green = isGreen != null ? (isGreen ? "Y" : "N") : null;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSearchedProducts({
    keyword,
    categoryId: category,
    isGreen: green,
  });
  const { ref } = useInfiniteScroll({ fetchNextPage, hasNextPage, isFetchingNextPage });
  const products = data?.pages.flat() ?? [];

  return (
    <>
      <ProductCard.List products={products}>
        <ProductCard.Grid />
      </ProductCard.List>
      <div ref={ref} className="h-12" />
      {isFetchingNextPage && <Spinner />}
    </>
  );
}
