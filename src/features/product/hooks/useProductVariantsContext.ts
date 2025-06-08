import { useContext } from "react";
import { ProductVariantsContext } from "../context";

export function useProductVariantsContext() {
  const context = useContext(ProductVariantsContext);
  if (!context) throw new Error("ProductVariantsContext.Provider 내에서 사용되어야 합니다.");
  return context;
}
