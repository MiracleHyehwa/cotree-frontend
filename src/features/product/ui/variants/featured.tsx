import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router-dom";
import { useProductVariantsContext } from "../../hooks/useProductVariantsContext";

export default function ProductCardListFeatured() {
  const { products } = useProductVariantsContext();

  return (
    <div className="grid grid-cols-1 gap-4 px-4 py-6">
      {products.map((product) => {
        const { id, name, price, discount, image_url } = product;
        const finalPrice = price - discount;

        return (
          <Link
            key={id}
            to={`/product/${id}`}
            className="flex flex-col justify-between h-full overflow-hidden bg-background rounded"
          >
            <div>
              <div className="aspect-video w-full">
                <img src={image_url} alt={name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 space-y-2">
                <div className="text-base font-semibold text-foreground line-clamp-2">{name}</div>
                <div className="text-xl font-bold text-primary">{finalPrice.toLocaleString()}원</div>
              </div>
            </div>
            <div className="px-4 pb-4">
              <Button size="sm" variant="secondary" className="w-full">
                구매하러 가기
              </Button>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
