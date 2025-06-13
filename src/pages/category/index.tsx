import { Suspense } from "react";
import { ProductCategoryFilterTabs } from "@/features/product/ui";
import { CommonLayout } from "@/shared/layout";
import ProductCategoryFilterTabsSkeleton from "@/features/product/ui/productCategoryFilterTabsSkleton";
import ProductListByCategory from "@/features/product/ui/productListByCategory";
import { ProductCard } from "@/features/product/ui/variants";

export default function CategoryPage() {
  return (
    <CommonLayout withBottomNav title="카테고리">
      <Suspense fallback={<ProductCategoryFilterTabsSkeleton />}>
        <ProductCategoryFilterTabs />
      </Suspense>
      <Suspense fallback={<ProductCard.GridSkeleton />}>
        <ProductListByCategory />
      </Suspense>
    </CommonLayout>
  );
}
