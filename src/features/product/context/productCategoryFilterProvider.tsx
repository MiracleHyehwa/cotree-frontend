import { useState } from "react";
import { ProductCategory, ProductCategoryFilterContext } from "./productCategoryFilterContext";
import { DEFAULT_CATEGORY } from "../constants";

export default function ProductCategoryFilterProvider({ children }: { children: React.ReactNode }) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>(DEFAULT_CATEGORY);

  return (
    <ProductCategoryFilterContext.Provider value={{ activeCategory, setActiveCategory }}>
      {children}
    </ProductCategoryFilterContext.Provider>
  );
}
