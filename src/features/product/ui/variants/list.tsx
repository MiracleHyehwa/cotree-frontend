import { ReactNode } from "react";
import { Product } from "@/entities/product/model";
import { ProductVariantsContext } from "@/features/product/context";

interface ProductCardListProps {
  products: Product[];
  children: ReactNode;
}

export default function ProductCardList({ products, children }: ProductCardListProps) {
  return <ProductVariantsContext.Provider value={{ products }}>{children}</ProductVariantsContext.Provider>;
}
