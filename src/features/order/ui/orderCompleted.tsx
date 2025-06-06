import { Button } from "@/shared/components/ui/button";

export default function OrderCompleted({ children }: { children: React.ReactNode }) {
  return <div className="w-full max-w-limit mx-auto p-4 space-y-2 pb-16">{children}</div>;
}

OrderCompleted.Message = function Message() {
  return (
    <div className="text-center space-y-2 py-2">
      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
        <svg className="w-6 h-6 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-xl font-bold text-foreground">주문이 완료되었습니다</h1>
    </div>
  );
};

OrderCompleted.OrderNumber = function OrderNumber({ value }: { value: string }) {
  return (
    <div className="text-sm border-b py-2">
      <div className="flex justify-between items-center">
        <span className="text-muted-foreground">주문번호</span>
        <span className="text-primary font-bold font-mono text-base">{value}</span>
      </div>
    </div>
  );
};

OrderCompleted.Items = function Items({
  items,
}: {
  items: { id: number; name: string; brand: string; option: string; quantity: number; price: number }[];
}) {
  return (
    <div className="space-y-2 border-b py-4">
      <p className="font-semibold text-foreground text-lg">주문 상품</p>
      {items.map((item) => (
        <div className="flex gap-4" key={item.id}>
          <img
            src={`https://dummyimage.com/80x100/f8f9fa/6c757d&text=${encodeURIComponent(item.name.slice(0, 3))}`}
            alt={item.name}
            className="w-20 h-25 object-cover rounded-md"
          />
          <div className="flex-1 space-y-1">
            <h3 className="font-medium text-foreground">{item.name}</h3>
            <p className="text-sm text-muted-foreground">
              {item.brand} · {item.option}
            </p>
            <p>{item.quantity}개</p>
            <p className="text-base font-semibold text-foreground">{(item.price * item.quantity).toLocaleString()}원</p>
          </div>
        </div>
      ))}
    </div>
  );
};

OrderCompleted.Delivery = function Delivery({
  recipient,
  phone,
  address,
  memo,
}: {
  recipient: string;
  phone: string;
  address: string;
  memo: string;
}) {
  return (
    <div className="space-y-2 text-sm border-b py-4">
      <p className="font-semibold text-foreground text-lg">배송 정보</p>
      <div className="space-y-2">
        <div className="flex justify-between items-center gap-4">
          <span className="text-muted-foreground">받는 분</span>
          <span className="text-foreground font-medium">{recipient}</span>
        </div>
        <div className="flex justify-between items-center gap-4">
          <span className="text-muted-foreground">연락처</span>
          <span className="text-foreground font-medium">{phone}</span>
        </div>
        <div className="flex justify-between items-center gap-4">
          <span className="text-muted-foreground">주소</span>
          <span className="text-foreground font-medium text-right leading-relaxed">{address}</span>
        </div>
        <div className="flex justify-between items-center gap-4">
          <span className="text-muted-foreground">배송 메모</span>
          <span className="text-foreground font-medium text-right">{memo}</span>
        </div>
      </div>
    </div>
  );
};

OrderCompleted.Payment = function Payment({ total, point }: { total: number; point: number }) {
  return (
    <section className="space-y-2 text-sm py-4">
      <h2 className="font-semibold text-foreground text-lg">결제 정보</h2>
      <div className="flex justify-between items-center text-base font-semibold">
        <span className="text-foreground">총 결제금액</span>
        <span className="text-primary text-xl font-bold">{total.toLocaleString()}원</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-muted-foreground">포인트 적립</span>
        <span className="text-primary/80 font-medium">+{point.toLocaleString()} P</span>
      </div>
    </section>
  );
};

OrderCompleted.Actions = function Actions({
  left,
  right,
}: {
  left: { label: string; onClick?: () => void };
  right: { label: string; onClick?: () => void };
}) {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-limit border-t border-border bg-background z-50">
      <div className="flex gap-3 p-4">
        <Button variant="outline" className="flex-1 h-12" onClick={left.onClick}>
          {left.label}
        </Button>
        <Button className="flex-1 h-12" onClick={right.onClick}>
          {right.label}
        </Button>
      </div>
    </div>
  );
};
