import { OrderItem } from "@/entities/order/model";
import { Badge } from "@/shared/components/ui/badge";
import { calculateGreenReward } from "@/shared/lib/greenpoint";

interface OrderProductSummaryProps {
  products: OrderItem[];
}

export default function OrderProductSummary({ products }: OrderProductSummaryProps) {
  return (
    <section className="space-y-3">
      <h2 className="font-semibold text-lg">주문상품</h2>
      {products.map((product, index) => {
        const { itemId, itemName, brandName, price, finalPrice, isGreen, quantity, thumbnailImage } = product;
        const totalPrice = finalPrice * quantity;
        const expectedPoint = calculateGreenReward(totalPrice, isGreen);
        const isDiscounted = finalPrice < price;
        const discountRate = Math.floor(((price - finalPrice) / price) * 100);

        return (
          <div key={itemId} className={`flex gap-4 pt-4 ${index !== 0 ? "border-t border-border" : ""}`}>
            <div className="relative w-24 aspect-square">
              <img src={thumbnailImage} alt={itemName} className="w-full h-full object-cover rounded border" />
              {isGreen === "Y" && (
                <div className="absolute bottom-1 right-1">
                  <Badge className="text-xs px-2 py-0.5">친환경</Badge>
                </div>
              )}
            </div>

            <div className="flex-1 text-sm flex flex-col justify-between">
              <div className="space-y-1">
                <div className="text-muted-foreground text-xs">{brandName}</div>
                <div className="font-medium leading-tight line-clamp-2">{itemName}</div>
              </div>

              <div className="mt-2 font-bold text-base flex flex-col gap-1">
                {isDiscounted && (
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-muted-foreground line-through">{price.toLocaleString()}원</span>
                    <span className="px-2 py-0.5 text-xs bg-destructive/10 text-destructive rounded-full font-semibold">
                      -{discountRate}%
                    </span>
                  </div>
                )}
                <div className="text-foreground font-bold">
                  {totalPrice.toLocaleString()}원 / {quantity}개
                </div>
              </div>

              {isGreen === "Y" && (
                <div className="text-xs text-primary">+ {expectedPoint.toLocaleString()}P 적립 예정</div>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}
