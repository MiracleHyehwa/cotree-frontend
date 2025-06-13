import { Suspense } from "react";
import { ProductCategoryFilterTabs } from "@/features/product/ui";
import { CommonLayout } from "@/shared/layout";
import { ProductCard } from "@/features/product/ui/variants";
import { useSearchParams } from "react-router-dom";
import ProductCategoryFilterTabsSkeleton from "@/features/product/ui/productCategoryFilterTabsSkleton";
import ProductListByCategory from "@/features/product/ui/productListByCategory";

export default function CategoryPage() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("type") ?? "0";

  return (
    <CommonLayout withBottomNav title="카테고리">
      <Suspense fallback={<ProductCategoryFilterTabsSkeleton />}>
        <ProductCategoryFilterTabs categoryId={categoryId} />
      </Suspense>
      <Suspense key={`category-${categoryId}`} fallback={<ProductCard.GridSkeleton />}>
        <ProductListByCategory key={categoryId} categoryId={categoryId} />
      </Suspense>
    </CommonLayout>
  );
}
