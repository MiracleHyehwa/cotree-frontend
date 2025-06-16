import { useOrderDetail } from "@/entities/order/api/hooks";
import { OrderCompleted } from "@/features/order/ui";
import { Navigate, useNavigate, useParams } from "react-router-dom";

function OrderCompletedContent({ orderId }: { orderId: string }) {
  const { data } = useOrderDetail(orderId);
  const navigate = useNavigate();

  const { orderNumber, destination, receiverName, receiverTel, request, totalPrice, rewardGreenPoint, orderItems } =
    data;

  const items = orderItems.map((item) => ({
    id: item.itemId,
    name: item.itemName,
    quantity: item.quantity,
    price: item.price - item.discount,
    image: item.itemThumbnailImage,
  }));
  return (
    <OrderCompleted>
      <OrderCompleted.Message />
      <OrderCompleted.OrderNumber value={orderNumber} />
      <OrderCompleted.Items items={items} />
      <OrderCompleted.Delivery recipient={receiverName} phone={receiverTel} address={destination} memo={request} />
      <OrderCompleted.Payment total={totalPrice} point={rewardGreenPoint} />
      <OrderCompleted.Actions label="쇼핑 계속하기" onClick={() => navigate("/")} />
    </OrderCompleted>
  );
}

export default function OrderCompletedView() {
  const { orderId } = useParams<{ orderId: string }>();

  if (!orderId) {
    return <Navigate to="/not-found" replace />;
  }

  return <OrderCompletedContent orderId={orderId} />;
}
