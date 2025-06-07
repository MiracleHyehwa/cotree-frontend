interface CartSummaryProps {
  totalPrice: number;
  totalDiscount: number;
  finalTotalPrice: number;
  totalPoints: number;
}

export default function CartSummary({ totalPrice, totalDiscount, finalTotalPrice, totalPoints }: CartSummaryProps) {
  return (
    <div className="px-4 py-3 space-y-2 text-base">
      <div className="flex justify-between">
        <span>총 상품금액</span>
        <span>{totalPrice.toLocaleString()}원</span>
      </div>
      <div className="flex justify-between">
        <span>총 배송비</span>
        <span>0원</span>
      </div>
      <div className="flex justify-between">
        <span>총 할인금액</span>
        <span className="text-primary">- {totalDiscount.toLocaleString()}원</span>
      </div>
      <div className="flex justify-between font-bold text-lg text-primary">
        <span>총 주문금액</span>
        <span>{finalTotalPrice.toLocaleString()}원</span>
      </div>
      {totalPoints > 0 && (
        <div className="flex justify-between text-sm text-muted-foreground font-medium">
          <span>총 적립 포인트</span>
          <span>{totalPoints.toLocaleString()}P</span>
        </div>
      )}
    </div>
  );
}
