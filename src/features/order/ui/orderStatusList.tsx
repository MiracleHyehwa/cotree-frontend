import { useOrderList } from "@/entities/order/api/hooks";
import { OrderStatusKey } from "../constants";
import { Badge } from "@/shared/components/ui/badge";
import { PackageX } from "lucide-react";

interface OrderStatusListProps {
  status: OrderStatusKey;
}

export default function OrderStatusList({ status }: OrderStatusListProps) {
  const { data: orders } = useOrderList(status === "ALL" ? undefined : status);

  if (orders.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-muted-foreground text-center px-4 py-12">
        <PackageX className="w-12 h-12 mb-4 text-primary" />
        <p className="text-base font-medium">주문 내역이 없습니다</p>
        <p className="text-sm mt-1">해당 상태의 주문 내역이 존재하지 않습니다.</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      {orders.map((order) => (
        <div key={order.orderId}>
          <div className="text-lg text-foreground font-semibold">
            {new Date(order.orderDate).toLocaleDateString("ko-KR")}
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground border-b pb-2">
            <span className="font-mono font-semibold text-sm">
              주문번호
              <span className="text-primary ml-2">{order.orderNumber}</span>
            </span>
          </div>

          {order.orderItemResponses.map((item, idx) => {
            const isLast = idx === order.orderItemResponses.length - 1;

            return (
              <div key={item.itemId} className={`flex gap-4 py-4 ${!isLast ? "border-b" : ""}`}>
                <img
                  src={item.itemThumbnailImage}
                  alt={item.itemName}
                  className="w-24 h-24 rounded-md object-cover border"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-sm font-medium text-foreground">{item.itemName}</div>
                    {item.isGreen === "Y" && <Badge>친환경</Badge>}
                    <div className="text-xs text-muted-foreground mt-1"></div>
                    <div className="text-sm font-semibold mt-2">
                      {item.price.toLocaleString()}원 / {item.quantity}개
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
