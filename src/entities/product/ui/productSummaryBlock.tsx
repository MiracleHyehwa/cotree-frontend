import { ProductSummary } from "@/entities/product/model";
import { Badge } from "@/shared/components/ui/badge";

interface ProductSummaryProps {
  product: ProductSummary;
}

export default function ProductSummaryBlock({ product }: ProductSummaryProps) {
  const { name, subtitle, brand, price, discount, points, isGreen } = product;
  const discountRate = Math.round((discount / price) * 100);
  const finalPrice = price - discount;

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        {isGreen === "Y" && <Badge className="rounded text-xs bg-primary/90 animate-pulse">친환경 인증</Badge>}
        <span>{brand.name}</span>
      </div>
      <h1 className="text-lg font-medium text-foreground leading-tight">{name}</h1>
      <div className="flex gap-2 mt-2 flex-col">
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-sm text-muted-foreground line-through">{price.toLocaleString("ko-KR")}원</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-primary">{discountRate}%</span>
          <span className="text-2xl font-bold text-foreground">{finalPrice.toLocaleString("ko-KR")}원</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{points}</p>
      </div>
    </div>
  );
}
