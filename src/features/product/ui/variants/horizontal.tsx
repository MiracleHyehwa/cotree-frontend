import { Link } from "react-router-dom";
import { Badge } from "@/shared/components/ui/badge";
import { useProductVariantsContext } from "../../hooks/useProductVariantsContext";

export default function ProductCardListHorizontal() {
  const { products } = useProductVariantsContext();

  return (
    <div className="w-full max-w-limit divide-y px-4 py-2 bg-background">
      {products.map((product) => {
        const { id, name, price, discount, brand, image_url, is_green } = product;
        const finalPrice = price - discount;

        return (
          <Link key={id} to={`/product/${id}`} className="flex gap-4 py-4 bg-background items-center w-full">
            <div className="w-[100px] h-[100px] relative flex-shrink-0">
              <img src={image_url} alt={name} className="w-full h-full object-cover rounded-md" />
              {is_green === "Y" && (
                <Badge className="absolute bottom-1 right-1 bg-primary text-white border-none text-xs">친환경</Badge>
              )}
            </div>

            <div className="flex flex-col justify-between gap-1">
              <div className="text-xs text-muted-foreground">{brand.name}</div>
              <div className="text-sm font-medium line-clamp-2">{name}</div>
              <div className="text-sm font-bold text-foreground">{finalPrice.toLocaleString()}원</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
