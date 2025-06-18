"use client";

import { usePurchaseCount } from "@/entities/admin/api/hooks";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

export default function PieChartLabelListWithPurchaseCount() {
  const { data = [] } = usePurchaseCount();

  const chartConfig = {
    ECO: {
      label: "친환경 상품",
      color: "var(--chart-1)",
    },
    GENERAL: {
      label: "일반 상품",
      color: "var(--chart-2)",
    },
  } satisfies Record<"ECO" | "GENERAL", { label: string; color: string }>;

  const chartData = data.map((item) => {
    const config = chartConfig[item.itemClassification];
    return {
      name: config.label,
      value: item.count,
      fill: config.color,
    };
  });

  const hasData = chartData.some((item) => item.value > 0);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>상품 유형별 구매 비율</CardTitle>
        <CardDescription className="sr-only">최근 30일 기준</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {hasData ? (
          <ChartContainer
            config={chartConfig}
            className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
              <Pie data={chartData} dataKey="value" nameKey="name" outerRadius="80%">
                <LabelList dataKey="name" position="inside" stroke="none" fill="#fff" fontSize={12} />
              </Pie>
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="flex-1 items-center justify-center text-sm text-muted-foreground text-center">
            표시할 데이터가 없습니다
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          상품 유형별 구매 분포 <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">30일간 누적 구매 수 기준</div>
      </CardFooter>
    </Card>
  );
}
