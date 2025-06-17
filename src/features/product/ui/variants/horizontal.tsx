import { Link } from "react-router-dom";
import { Badge } from "@/shared/components/ui/badge";
import { useProductVariantsContext } from "../../hooks/useProductVariantsContext";

export default function ProductCardListHorizontal() {
  const { products } = useProductVariantsContext();

  return (
    <div className="w-full max-w-limit bg-background divide-y py-4">
      {products.map((product, index) => {
        const { id, name, price, salePrice, discountRate, quantity, thumbnailImage, brandName, isGreen } = product;
        const isSoldOut = quantity === 0;

        return (
          <Link
            key={id}
            to={`/product/${id}`}
            className={`flex gap-4 group items-start py-4 ${index === 0 ? "pt-0" : ""} ${
              isSoldOut ? "pointer-events-none opacity-60 cursor-not-allowed" : ""
            }`}
            onClick={(e) => {
              if (isSoldOut) {
                e.preventDefault();
              }
            }}
          >
            <div className="w-[140px] h-[140px] relative overflow-hidden rounded-md flex-shrink-0">
              <img
                src={thumbnailImage}
                alt={name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
              />
              {isGreen === "Y" && <Badge className="absolute bottom-2 right-2 text-xs font-semibold">친환경</Badge>}
              {isSoldOut && (
                <div className="absolute inset-0 bg-black/50 text-white flex items-center justify-center text-sm font-semibold z-10">
                  품절
                </div>
              )}
            </div>

            <div className="flex flex-col justify-between flex-1 min-w-0">
              <div className="text-xs text-muted-foreground">{brandName}</div>
              <div className="mt-1 text-sm font-medium text-foreground leading-tight line-clamp-2">{name}</div>

              <div className="mt-2 space-y-1">
                {discountRate > 0 && (
                  <div className="flex flex-col gap-1 items-start">
                    <span className="text-sm text-muted-foreground line-through">{price.toLocaleString()}원</span>
                    <span className="px-2 py-0.5 text-xs bg-destructive/10 text-destructive rounded-full font-semibold w-fit">
                      -{discountRate}%
                    </span>
                  </div>
                )}
                <span className="text-lg font-bold">{salePrice.toLocaleString()}원</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
