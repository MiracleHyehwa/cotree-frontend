import { Link } from "react-router-dom";
import { useProductVariantsContext } from "../../hooks/useProductVariantsContext";
import { Badge } from "@/shared/components/ui/badge";

export default function ProductCardHighlighted() {
  const { products } = useProductVariantsContext();

  return (
    <div className="grid grid-cols-2 gap-4 py-4 max-w-limit mx-auto">
      {products.map((product) => {
        const { id, name, price, salePrice, discountRate, quantity, thumbnailImage, brandName, isGreen } = product;
        const isSoldOut = quantity === 0;

        return (
          <Link
            key={id}
            to={`/product/${id}`}
            className="group bg-background rounded overflow-hidden"
            onClick={(e) => {
              if (isSoldOut) {
                e.preventDefault();
              }
            }}
          >
            <div className="relative overflow-hidden">
              <div className="aspect-square relative rounded">
                <img src={thumbnailImage} alt={name} className="w-full h-full object-cover rounded" />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {isSoldOut && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-semibold z-10 text-sm">
                    품절
                  </div>
                )}
              </div>

              <div className="absolute top-2 left-2 flex flex-col gap-1 animate-pulse">
                {isGreen === "Y" && <Badge>친환경</Badge>}
              </div>
            </div>
            <div className="py-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-medium text-xs">{brandName}</span>
              </div>

              <p className="font-semibold text-foreground text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-200 min-h-[2.25rem]">
                {name}
              </p>

              <div className="space-y-1">
                {discountRate > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-muted-foreground line-through">{price.toLocaleString()}원</span>
                    <p className="px-2 py-0.5 text-xs bg-destructive/10 text-destructive rounded-full font-semibold">
                      -{discountRate}%
                    </p>
                  </div>
                )}
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-lg font-bold text-foreground">{salePrice.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground ml-0.5">원</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
