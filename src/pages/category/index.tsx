import { Suspense, useEffect } from "react";
import { ProductCategoryFilterTabs } from "@/features/product/ui";
import { CommonLayout } from "@/shared/layout";
import { ProductCard } from "@/features/product/ui/variants";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductCategoryFilterTabsSkeleton from "@/features/product/ui/productCategoryFilterTabsSkleton";
import ProductListByCategory from "@/features/product/ui/productListByCategory";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/shared/components";

export default function CategoryPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("type");

  useEffect(() => {
    if (!categoryId) {
      navigate("/category?type=0", { replace: true });
    }
  }, [categoryId, navigate]);

  return (
    <CommonLayout withBottomNav title="카테고리">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<ProductCategoryFilterTabsSkeleton />}>
          <ProductCategoryFilterTabs categoryId={categoryId ?? "0"} />
        </Suspense>
        <Suspense key={`category-${categoryId}`} fallback={<ProductCard.GridSkeleton />}>
          <ProductListByCategory key={categoryId} categoryId={categoryId ?? "0"} />
        </Suspense>
      </ErrorBoundary>
    </CommonLayout>
  );
}
