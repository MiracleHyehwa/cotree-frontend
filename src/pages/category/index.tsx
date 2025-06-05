import { ProductCardList } from "@/entities/product/ui";
import { ProductCategoryFilter, ProductCategoryFilterTabs } from "@/features/product/ui";
import { CommonLayout } from "@/shared/layout";
import { CATEGORIES } from "@/features/product/constants";
import { ProductCategoryFilterProvider } from "@/features/product/context";

export default function CategoryPage() {
  return (
    <ProductCategoryFilterProvider>
      <CommonLayout>
        <ProductCategoryFilterTabs />
        <ProductCategoryFilter>
          {CATEGORIES.map(({ key }) => (
            <ProductCategoryFilter.When key={key} category={key}>
              <ProductCardList category={key} />
            </ProductCategoryFilter.When>
          ))}
        </ProductCategoryFilter>
      </CommonLayout>
    </ProductCategoryFilterProvider>
  );
}
