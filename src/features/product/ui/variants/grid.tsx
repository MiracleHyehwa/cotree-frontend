import { Badge } from "@/shared/components/ui/badge";
import { Link } from "react-router-dom";
import { useProductVariantsContext } from "@/features/product/hooks";

export default function ProductCardGrid() {
  const { products } = useProductVariantsContext();

  return (
    <div className="grid grid-cols-2 gap-4 py-4">
      {products.map((product) => {
        const { id, name, price, salePrice, discountRate, origin, thumbnailImage, brandName, isGreen } = product;
        const hasDiscount = discountRate > 0;

        return (
          <Link key={id} to={`/product/${id}`} className="relative bg-background overflow-hidden">
            <div className="relative w-full aspect-[3/4]">
              <img src={thumbnailImage} alt={name} className="absolute inset-0 w-full h-full object-cover" />
              {isGreen === "Y" && (
                <Badge className="absolute bottom-2 right-2 bg-primary text-white border-none animate-pulse">
                  친환경
                </Badge>
              )}
            </div>

            <div className="pt-2 pb-3 space-y-1">
              <div className="text-xs text-muted-foreground">{brandName}</div>
              <div className="text-sm font-medium leading-snug break-words line-clamp-2">{name}</div>
              {hasDiscount && (
                <div className="flex items-center gap-1 text-sm mt-1">
                  <span className="text-primary text-xs font-semibold">{discountRate}%</span>
                  <span className="line-through text-gray-400">{price.toLocaleString()}원</span>
                </div>
              )}
              <div className="text-base font-bold">{salePrice.toLocaleString()}원</div>
              <div className="text-xs text-muted-foreground">원산지: {origin}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
