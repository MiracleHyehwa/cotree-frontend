import { useContext } from "react";
import { ProductCategoryFilterContext } from "../context/productCategoryFilterContext";

export const useProductCategoryFilterContext = () => useContext(ProductCategoryFilterContext);
