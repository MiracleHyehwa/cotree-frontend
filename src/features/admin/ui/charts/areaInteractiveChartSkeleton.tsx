import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

export default function AreaInteractiveChartSkeleton() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>
          <Skeleton className="w-32 h-6 rounded" />
        </CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            <Skeleton className="w-24 h-4" />
          </span>
          <span className="@[540px]/card:hidden">
            <Skeleton className="w-16 h-4" />
          </span>
        </CardDescription>
        <CardAction>
          <div className="hidden @[767px]/card:flex gap-2">
            <Skeleton className="w-12 h-8 rounded-md" />
            <Skeleton className="w-12 h-8 rounded-md" />
            <Skeleton className="w-16 h-8 rounded-md" />
          </div>

          <div className="@[767px]/card:hidden w-32">
            <Skeleton className="h-8 w-full rounded-md" />
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <div className="h-[250px] w-full rounded-md bg-muted" />
      </CardContent>
    </Card>
  );
}
