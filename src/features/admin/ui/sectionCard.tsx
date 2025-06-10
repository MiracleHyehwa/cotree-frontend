import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";

export default function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>총 매출</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">₩1,250,000</CardTitle>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">최근 30일 기준</CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>신규 가입자 수</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">1,234명</CardTitle>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">이번 달 신규 회원 수</CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>총 주문 건수</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">5,678건</CardTitle>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">누적 주문 수</CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>친환경 상품 비율</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">68%</CardTitle>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">전체 상품 중 친환경 태그 포함 비율</CardFooter>
      </Card>
    </div>
  );
}
