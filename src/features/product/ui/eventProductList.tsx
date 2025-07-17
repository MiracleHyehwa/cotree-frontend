import { useEventProducts } from "@/entities/product/api/hooks";
import { ProductCard } from "./variants";

export default function EventProductList() {
  const { data: eventProducts } = useEventProducts();

  return (
    <ProductCard.List products={eventProducts}>
      <ProductCard.Highlighted />
    </ProductCard.List>
  );
}
