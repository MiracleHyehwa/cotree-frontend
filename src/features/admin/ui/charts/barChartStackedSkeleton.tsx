import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TrendingUp } from "lucide-react";

export default function BarChartStackedSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <CardTitle>친환경 인기 상품</CardTitle>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] w-full flex items-center justify-center">
          <div className="w-full h-full grid grid-cols-6 gap-4 items-end px-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="w-6 h-28 bg-muted rounded" />
                <div className="w-10 h-3 bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          <Skeleton className="w-40 h-4" />
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </div>
        <Skeleton className="w-60 h-3" />
      </CardFooter>
    </Card>
  );
}
