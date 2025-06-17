import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TrendingUp } from "lucide-react";

export default function BarChartCustomLabelSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>친환경 인기 상품</CardTitle>
        <CardDescription className="sr-only">최근 30일 기준</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="h-6 w-[80%] rounded-md" />
            <Skeleton className="h-4 w-6" />
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          <Skeleton className="h-4 w-40" />
          <TrendingUp className="h-4 w-4 text-muted" />
        </div>
        <Skeleton className="h-3 w-56" />
      </CardFooter>
    </Card>
  );
}
