import { ORDER_STATUS_MAP } from "../constants";

interface OrderStatusListProps {
  status: keyof typeof ORDER_STATUS_MAP;
}

const orders = [
  {
    orderId: "43508340580",
    date: "2025.06.01",
    items: [
      {
        name: "유기농 사과 3kg",
        option: "중과 / 3kg",
        price: 21500,
        quantity: 1,
      },
      {
        name: "2025년산 햅쌀 10kg",
        option: "백미 / 10kg",
        price: 32000,
        quantity: 1,
      },
    ],
  },
  {
    orderId: "23423459",
    date: "2025.05.28",
    items: [
      {
        name: "친환경 달걀 30구",
        option: "대란 / 무항생제",
        price: 8900,
        quantity: 2,
      },
    ],
  },
];

export default function OrderStatusList({ status }: OrderStatusListProps) {
  return (
    <div className="px-4 py-6">
      {orders.map((order) => (
        <div key={order.orderId}>
          <div className="text-lg text-foreground font-semibold">{order.date}</div>

          <div className="flex items-center justify-between text-sm text-muted-foreground border-b pb-2">
            <span className="text-primary font-mono font-semibold text-sm">주문번호 {order.orderId}</span>
          </div>

          {order.items.map((item, idx) => {
            const isLast = idx === order.items.length - 1;
            return (
              <div key={idx} className={`flex gap-4 py-4 ${!isLast ? "border-b" : ""}`}>
                <img
                  src="https://picsum.photos/200/300"
                  alt={item.name}
                  className="w-24 h-24 rounded-md object-cover border"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">옵션: {item.option}</div>
                    <div className="text-sm font-semibold mt-2">
                      {item.price.toLocaleString()}원 / {item.quantity}개
                    </div>
                  </div>
                  <div className="text-xs text-proimary mt-1">{status}</div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
