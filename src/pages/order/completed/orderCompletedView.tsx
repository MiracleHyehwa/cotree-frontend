import { OrderCompleted } from "@/features/order/ui";

export default function OrderCompletedView() {
  const orderItems = [
    { id: 1, name: "친환경 국산 사과즙 100%", brand: "자연애", option: "1박스/30포", quantity: 1, price: 12000 },
    { id: 2, name: "유기농 배즙 원액", brand: "자연애", option: "1박스/20포", quantity: 2, price: 15000 },
    { id: 3, name: "무농약 당근즙", brand: "건강원", option: "1박스/30포", quantity: 1, price: 18000 },
  ];

  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <OrderCompleted>
      <OrderCompleted.Message />
      <OrderCompleted.OrderNumber value="2020090519683953" />
      <OrderCompleted.Items items={orderItems} />
      <OrderCompleted.Delivery
        recipient="홍길동"
        phone="010-1234-5678"
        address="서울특별시 강남구 강남동 111-1번지 111호"
        memo="부재 시 경비실에 맡겨주세요"
      />
      <OrderCompleted.Payment total={total} point={946} />
      <OrderCompleted.Actions
        left={{ label: "주문 상세 보기", onClick: () => {} }}
        right={{ label: "쇼핑 계속 하기", onClick: () => {} }}
      />
    </OrderCompleted>
  );
}
