"use client";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/shared/components/ui/toggle-group";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const chartData = [
  { date: "2024-06-01", used: 1200, rewarded: 800 },
  { date: "2024-06-02", used: 900, rewarded: 1500 },
  { date: "2024-06-03", used: 700, rewarded: 600 },
  { date: "2024-06-04", used: 1100, rewarded: 900 },
  { date: "2024-06-05", used: 500, rewarded: 300 },
  { date: "2024-06-06", used: 1300, rewarded: 1500 },
  { date: "2024-06-07", used: 1000, rewarded: 1200 },
  { date: "2024-06-08", used: 950, rewarded: 1000 },
  { date: "2024-06-09", used: 800, rewarded: 850 },
  { date: "2024-06-10", used: 780, rewarded: 700 },
  { date: "2024-06-11", used: 1200, rewarded: 1300 },
  { date: "2024-06-12", used: 670, rewarded: 720 },
  { date: "2024-06-13", used: 910, rewarded: 890 },
  { date: "2024-06-14", used: 600, rewarded: 1000 },
  { date: "2024-06-15", used: 890, rewarded: 950 },
  { date: "2024-06-16", used: 1100, rewarded: 1150 },
  { date: "2024-06-17", used: 740, rewarded: 660 },
  { date: "2024-06-18", used: 980, rewarded: 900 },
  { date: "2024-06-19", used: 620, rewarded: 700 },
  { date: "2024-06-20", used: 900, rewarded: 850 },
  { date: "2024-06-21", used: 780, rewarded: 870 },
  { date: "2024-06-22", used: 650, rewarded: 600 },
  { date: "2024-06-23", used: 1020, rewarded: 1100 },
  { date: "2024-06-24", used: 940, rewarded: 960 },
  { date: "2024-06-25", used: 890, rewarded: 930 },
  { date: "2024-06-26", used: 750, rewarded: 720 },
  { date: "2024-06-27", used: 970, rewarded: 890 },
  { date: "2024-06-28", used: 840, rewarded: 860 },
  { date: "2024-06-29", used: 620, rewarded: 750 },
  { date: "2024-06-30", used: 1100, rewarded: 1200 },
];

const chartConfig = {
  visitors: {
    label: "포인트 사용/적립 추이",
  },
  used: {
    label: "사용",
    color: "var(--primary)",
  },
  rewarded: {
    label: "적립",
    color: "var(--destructive)",
  },
} satisfies ChartConfig;

export default function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = useState("7d");

  const generateChartData = () => {
    const start = new Date("2024-03-01");
    const end = new Date("2024-06-30");
    const data = [];

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      data.push({
        date: new Date(d).toISOString().split("T")[0],
        used: Math.floor(Math.random() * 10000 + 20000),
        rewarded: Math.floor(Math.random() * 10000 + 15000),
      });
    }

    return data;
  };

  const chartData = generateChartData();

  useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-01");
    let daysToSubtract = 90;
    if (timeRange === "30d") daysToSubtract = 30;
    else if (timeRange === "7d") daysToSubtract = 7;
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>포인트 사용/적립 추이</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            최근 {timeRange === "90d" ? "3개월" : timeRange === "30d" ? "30일" : "7일"}간 포인트 흐름
          </span>
          <span className="@[540px]/card:hidden">포인트 흐름</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="7d" className="cursor-pointer">
              7일
            </ToggleGroupItem>
            <ToggleGroupItem value="30d" className="cursor-pointer">
              30일
            </ToggleGroupItem>
            <ToggleGroupItem value="90d" className="cursor-pointer">
              3개월
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-32 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="기간 선택"
            >
              <SelectValue placeholder="3개월" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="7d" className="rounded-lg">
                7일
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                30일
              </SelectItem>
              <SelectItem value="90d" className="rounded-lg">
                3개월
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillUsed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-used)" stopOpacity={1.0} />
                <stop offset="95%" stopColor="var(--color-used)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillRewarded" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-rewarded)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-rewarded)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("ko-KR", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 4}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("ko-KR", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area dataKey="used" type="natural" fill="url(#fillUsed)" stroke="var(--color-used)" stackId="a" />
            <Area
              dataKey="rewarded"
              type="natural"
              fill="url(#fillRewarded)"
              stroke="var(--color-rewarded)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
