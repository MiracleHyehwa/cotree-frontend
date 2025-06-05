import { ReactNode } from "react";
import type { ProductCategory } from "../context/productCategoryFilterContext";
import { useProductCategoryFilterContext } from "../hooks";

interface WhenProps {
  category: ProductCategory;
  children: ReactNode;
}

function When({ category, children }: WhenProps) {
  const { activeCategory } = useProductCategoryFilterContext();
  return activeCategory === category ? <>{children}</> : null;
}

interface FilterRootProps {
  children: ReactNode;
}

export default function ProductCategoryFilter({ children }: FilterRootProps) {
  return <>{children}</>;
}

ProductCategoryFilter.When = When;

export { ProductCategoryFilter };
