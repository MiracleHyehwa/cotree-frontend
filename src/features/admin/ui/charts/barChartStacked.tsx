import { usePurchaseCategory } from "@/entities/admin/api/hooks";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  eco: {
    label: "친환경 상품",
    color: "var(--chart-1)",
  },
  normal: {
    label: "일반 상품",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function BarChartStacked() {
  const { data = [] } = usePurchaseCategory();

  const chartData =
    data.map((item) => ({
      category: item.categoryName,
      eco: item.ecoItemPurchaseCount,
      normal: item.normalItemPurchaseCount,
    })) ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>카테고리별 구매 건수</CardTitle>
        <CardDescription className="sr-only">친환경 vs 일반 상품</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="normal" stackId="a" fill="var(--chart-2)" radius={[0, 0, 4, 4]} />
            <Bar dataKey="eco" stackId="a" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          카테고리별 상품 구매 현황 <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">친환경 상품 구매율을 기준으로 분포를 시각화합니다.</div>
      </CardFooter>
    </Card>
  );
}
