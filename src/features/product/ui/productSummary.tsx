import type { ProductSummary } from "@/entities/product/model";
import { Badge } from "@/shared/components/ui/badge";

interface ProductSummaryProps {
  product: ProductSummary;
}

export default function ProductSummary({ product }: ProductSummaryProps) {
  const { name, price, salePrice, discountRate, brandName, isGreen } = product;
  const showDiscount = salePrice > 0 && discountRate > 0;
  const point = isGreen === "Y" ? Math.floor(salePrice * 0.01) : 0;

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        {isGreen === "Y" && <Badge className="rounded text-xs bg-primary/90 animate-pulse">친환경</Badge>}
        <span>{brandName}</span>
      </div>
      <h1 className="text-lg font-medium text-foreground leading-tight">{name}</h1>

      <div className="mb-4">
        {showDiscount && (
          <>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-sm text-muted-foreground line-through">{price.toLocaleString("ko-KR")}원</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-primary">{discountRate}%</span>
              <span className="text-2xl font-bold text-foreground">{salePrice.toLocaleString("ko-KR")}원</span>
            </div>
          </>
        )}
        {!showDiscount && <span className="text-2xl font-bold text-foreground">{price.toLocaleString("ko-KR")}원</span>}

        {point > 0 && <p className="text-sm text-muted-foreground mt-1">{point}P 적립</p>}
      </div>
    </div>
  );
}
