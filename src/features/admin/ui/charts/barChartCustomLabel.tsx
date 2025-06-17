import { useEcoPopularItems } from "@/entities/admin/api/hooks";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

export const description = "A bar chart with a custom label";

const chartConfig = {
  count: {
    label: "구매 횟수",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig;

export default function BarChartCustomLabel() {
  const { data = [] } = useEcoPopularItems();
  const chartData = data.map((d) => ({
    id: d.itemId,
    name: d.itemName,
    count: d.purchaseCount,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>친환경 인기 상품</CardTitle>
        <CardDescription className="sr-only">최근 30일 기준</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Bar dataKey="count" layout="vertical" fill="var(--chart-2)" radius={4}>
              <LabelList
                dataKey="name"
                position="insideLeft"
                offset={8}
                className="fill-(--color-label)"
                fontSize={12}
              />
              <LabelList dataKey="count" position="right" offset={8} fill="var(--foreground)" fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          최근 30일간 가장 많이 구매된 상품입니다
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">친환경 상품 구매 비율을 기반으로 합니다</div>
      </CardFooter>
    </Card>
  );
}
