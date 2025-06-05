import { CommonLayout } from "@/shared/layout";
import { Button } from "@/shared/components/ui/button";

export default function OrderCompletedPage() {
  const orderItems = [
    { id: 1, name: "친환경 국산 사과즙 100%", brand: "자연애", option: "1박스/30포", quantity: 1, price: 12000 },
    { id: 2, name: "유기농 배즙 원액", brand: "자연애", option: "1박스/20포", quantity: 2, price: 15000 },
    { id: 3, name: "무농약 당근즙", brand: "건강원", option: "1박스/30포", quantity: 1, price: 18000 },
  ];

  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CommonLayout title="주문 완료">
      <div className="w-full max-w-limit mx-auto p-4 space-y-6 pb-24">
        <div className="text-center space-y-4 border-b pb-4">
          <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-foreground">주문이 완료되었습니다</h1>
        </div>

        <div className="text-sm border-b pb-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">주문번호</span>
            <span className="text-primary font-bold font-mono text-base">2020090519683953</span>
          </div>
        </div>

        <div className="space-y-4 border-b pb-4">
          <h2 className="font-semibold text-foreground text-lg">주문 상품</h2>
          {orderItems.map((item) => (
            <div className="flex gap-4" key={item.id}>
              <img
                src={`https://dummyimage.com/80x100/f8f9fa/6c757d&text=${encodeURIComponent(item.name.slice(0, 3))}`}
                alt={item.name}
                className="w-20 h-25 object-cover rounded-md"
              />
              <div className="flex-1 space-y-1">
                <h3 className="font-medium text-foreground">{item.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.brand} · {item.option} · {item.quantity}개
                </p>
                <p className="text-base font-semibold text-foreground">
                  {(item.price * item.quantity).toLocaleString()}원
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4 text-sm border-b pb-4">
          <h2 className="font-semibold text-foreground text-lg">배송 정보</h2>

          <div className="space-y-2">
            <div className="flex justify-between items-center gap-4">
              <span className="text-muted-foreground">받는 분</span>
              <span className="text-foreground font-medium">홍길동</span>
            </div>

            <div className="flex justify-between items-center gap-4">
              <span className="text-muted-foreground">연락처</span>
              <span className="text-foreground font-medium">010-1234-5678</span>
            </div>

            <div className="flex justify-between items-center gap-4">
              <span className="text-muted-foreground">주소</span>
              <span className="text-foreground font-medium text-right leading-relaxed">
                서울특별시 강남구 강남동 111-1번지 111호
              </span>
            </div>

            <div className="flex justify-between items-center gap-4">
              <span className="text-muted-foreground">배송 메모</span>
              <span className="text-foreground font-medium text-right">부재 시 경비실에 맡겨주세요</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 text-sm">
          <h2 className="font-semibold text-foreground text-lg">결제 정보</h2>

          <div className="flex justify-between items-center text-base font-semibold">
            <span className="text-foreground">총 결제금액</span>
            <span className="text-primary text-xl font-bold">{total.toLocaleString()}원</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">포인트 적립</span>
            <span className="text-primary/80 font-medium">+946 P</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-limit border-t border-border bg-background z-50">
        <div className="flex gap-3 p-4">
          <Button variant="outline" className="flex-1 h-12 cursor-pointer">
            주문 상세 보기
          </Button>
          <Button className="flex-1 h-12 cursor-pointer">쇼핑 계속 하기</Button>
        </div>
      </div>
    </CommonLayout>
  );
}
