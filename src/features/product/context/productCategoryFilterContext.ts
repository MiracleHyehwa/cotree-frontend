import { createContext } from "react";
import { CATEGORY_KEYS, DEFAULT_CATEGORY } from "../constants";

export type ProductCategory = (typeof CATEGORY_KEYS)[number];

interface ProductCategoryFilterContextValue {
  activeCategory: ProductCategory;
  setActiveCategory: (category: ProductCategory) => void;
}

const defaultValue: ProductCategoryFilterContextValue = {
  activeCategory: DEFAULT_CATEGORY,
  setActiveCategory: () => {},
};

export const ProductCategoryFilterContext = createContext<ProductCategoryFilterContextValue>(defaultValue);
