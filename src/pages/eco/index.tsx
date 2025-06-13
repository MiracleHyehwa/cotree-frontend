import EcoProductList from "@/features/product/ui/ecoProductList";
import { ProductCard } from "@/features/product/ui/variants";
import { CommonLayout } from "@/shared/layout";
import { TabNavigation } from "@/shared/tabs";
import { Suspense } from "react";

export default function EcoPage() {
  return (
    <CommonLayout withBottomNav title="친환경">
      <TabNavigation />
      <div className="w-full max-w-limit px-4">
        <Suspense fallback={<ProductCard.GridSkeleton />}>
          <EcoProductList />
        </Suspense>
      </div>
    </CommonLayout>
  );
}
