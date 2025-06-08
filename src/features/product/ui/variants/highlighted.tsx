import { Link } from "react-router-dom";
import { useProductVariantsContext } from "../../hooks/useProductVariantsContext";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";

export default function ProductCardHighlighted() {
  const { products } = useProductVariantsContext();

  return (
    <div className="grid grid-cols-2 gap-4 py-4 max-w-limit mx-auto">
      {products.map((product) => {
        const { id, name, price, discount, image_url, brand, is_green } = product;
        const finalPrice = price - discount;
        const discountPercent = discount > 0 ? Math.round((discount / price) * 100) : 0;

        return (
          <Link key={id} to={`/product/${id}`} className="group bg-backgroundrounded overflow-hidden">
            <div className="relative overflow-hidden">
              <div className="aspect-square relative rounded">
                <img src={image_url} alt={name} className="w-full h-full object-cover rounded" />

                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="absolute top-2 left-2 flex flex-col gap-1 animate-pulse">
                {is_green === "Y" && <Badge>친환경</Badge>}
              </div>

              <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                <Button
                  className="w-full  hover:bg-primary/90 transition-colors duration-200 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <ShoppingCart className="w-4 !h-4" />
                  담기
                </Button>
              </div>
            </div>

            <div className="py-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-medium text-xs">{brand.name}</span>
              </div>

              <p className="font-semibold text-foreground text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-200 min-h-[2.25rem]">
                {name}
              </p>

              <div className="space-y-1">
                {discount > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-muted-foreground line-through">{price.toLocaleString()}원</span>
                    <p className="px-2 py-0.5 text-xs bg-destructive/10 text-destructive  rounded-full font-semibold">
                      -{discountPercent}%
                    </p>
                  </div>
                )}
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-lg font-bold text-foreground">{finalPrice.toLocaleString()}</span>
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
