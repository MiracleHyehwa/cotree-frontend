import { usePurchaseAge } from "@/entities/admin/api/hooks";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const ageLabelMap: Record<string, string> = {
  "10s": "10대",
  "20s": "20대",
  "30s": "30대",
  "40s": "40대",
  "50s": "50대",
  "60s": "60대",
};

const chartConfig = {
  value: {
    label: "구매 수",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function BarChartVertical() {
  const { data } = usePurchaseAge();

  const chartData = data.map((item) => ({
    age: ageLabelMap[item.memberAge] ?? item.memberAge,
    value: item.count,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>연령대별 구매 분포</CardTitle>
        <CardDescription className="sr-only">최근 30일 기준</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="age" tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="value" fill="var(--chart-1)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          연령대별 구매 수 <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">최근 30일간 누적 구매 수 기준</div>
      </CardFooter>
    </Card>
  );
}
