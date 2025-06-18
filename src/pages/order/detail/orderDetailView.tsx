import { useOrderDetail } from "@/entities/order/api/hooks";
import { Button } from "@/shared/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function OrderDetailView({ orderId }: { orderId: string }) {
  const { data } = useOrderDetail(orderId);
  const navigate = useNavigate();
  const { orderNumber, destination, receiverName, receiverTel, request, totalPrice, rewardGreenPoint, orderItems } =
    data;

  return (
    <div className="w-full max-w-limit mx-auto p-4 space-y-2 py-12">
      <div className="text-sm border-b py-2">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">주문번호</span>
          <span className="text-primary font-bold font-mono text-base">{orderNumber}</span>
        </div>
      </div>

      <div className="space-y-2 border-b py-4">
        <p className="font-semibold text-foreground text-lg">주문 상품</p>
        {orderItems.map((item) => (
          <div className="flex gap-4" key={item.itemId}>
            <img src={item.itemThumbnailImage} alt={item.itemName} className="w-20 h-25 object-cover rounded-md" />

            <div className="flex-1 space-y-1">
              <h3 className="font-medium text-foreground">{item.itemName}</h3>
              <p className="text-base font-semibold text-foreground">
                {(item.quantity * (item.price - item.discount)).toLocaleString()}원
              </p>
              <p>{item.quantity}개</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2 text-sm border-b py-4">
        <p className="font-semibold text-foreground text-lg">배송 정보</p>
        <div className="space-y-2">
          <div className="flex justify-between items-center gap-4">
            <span className="text-muted-foreground">받는 분</span>
            <span className="text-foreground font-medium">{receiverName}</span>
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="text-muted-foreground">연락처</span>
            <span className="text-foreground font-medium">{receiverTel}</span>
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="text-muted-foreground">주소</span>
            <span className="text-foreground font-medium text-right leading-relaxed">{destination}</span>
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="text-muted-foreground">배송 메모</span>
            <span className="text-foreground font-medium text-right">{request || "요청사항이 없습니다"}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 text-sm py-4">
        <h2 className="font-semibold text-foreground text-lg">결제 정보</h2>
        <div className="flex justify-between items-center text-base font-semibold">
          <span className="text-foreground">총 결제금액</span>
          <span className="text-primary text-xl font-bold">{totalPrice.toLocaleString()}원</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">포인트 적립</span>
          <span className="text-primary/80 font-medium">+{rewardGreenPoint.toLocaleString()} P</span>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-limit border-t border-border bg-background z-50">
        <div className="flex gap-3 p-4">
          <Button className="flex-1 h-12 cursor-pointer" onClick={() => navigate("/")}>
            쇼핑 계속하기
          </Button>
        </div>
      </div>
    </div>
  );
}
