import { useOrderList } from "@/entities/order/api/hooks";
import { OrderStatusKey } from "../constants";
import { Badge } from "@/shared/components/ui/badge";
import { PackageX } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import { OrderListItem } from "@/entities/order/model";
import PaymentFailRetryPaymentBottomSheet from "./paymentFailRetryPaymentBottomSheet";

interface OrderStatusListProps {
  status: OrderStatusKey;
}

export default function OrderStatusList({ status }: OrderStatusListProps) {
  const { data: orders } = useOrderList(status === "ALL" ? undefined : status);
  const navigate = useNavigate();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderListItem | null>(null);

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
              <Button
                variant="link"
                className="p-0 h-auto text-primary ml-2 text-sm cursor-pointer"
                onClick={() => {
                  if (order.orderStatus === "PAID") {
                    navigate(`/order/completed/${order.orderNumber}`, { state: { from: "order-status" } });
                  } else {
                    setSelectedOrder(order);
                    setIsBottomSheetOpen(true);
                  }
                }}
              >
                {order.orderNumber}
              </Button>
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
                    <Link
                      to={`/product/${item.itemId}`}
                      className="text-sm font-medium text-foreground hover:underline"
                    >
                      {item.itemName}
                    </Link>
                    {item.isGreen === "Y" && <Badge>친환경</Badge>}
                    <div className="text-xs text-muted-foreground mt-1"></div>
                    <div className="text-sm font-semibold mt-2 flex flex-col gap-1">
                      {item.discount > 0 ? (
                        <>
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-muted-foreground line-through mr-1">
                              {item.price.toLocaleString()}원
                            </span>
                            <p className="px-2 py-0.5 text-xs bg-destructive/10 text-destructive rounded-full font-semibold">
                              -{Math.floor((item.discount / item.price) * 100)}%
                            </p>
                          </div>
                          <div className="text-foreground font-bold">
                            {(item.price - item.discount).toLocaleString()}원 / {item.quantity}개
                          </div>
                        </>
                      ) : (
                        <div>
                          {item.price.toLocaleString()}원 / {item.quantity}개
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
      <PaymentFailRetryPaymentBottomSheet
        open={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
}
