import { createContext } from "react";
import { Product } from "@/entities/product/model";

interface ProductVariantsContextValue {
  products: Product[];
}
export const ProductVariantsContext = createContext<ProductVariantsContextValue | null>(null);
