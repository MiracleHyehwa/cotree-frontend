import { Card, CardContent, CardFooter, CardHeader } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

export default function PieChartLabelListSkeleton() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <Skeleton className="w-full h-4" />
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="flex items-center justify-center mx-auto aspect-square max-h-[250px] w-full">
          <Skeleton className="w-[120px] h-[120px] rounded-full" />
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          <Skeleton className="w-full h-8" />
        </div>
        <div className="text-muted-foreground leading-none">
          <Skeleton className="w-full h-8" />
        </div>
      </CardFooter>
    </Card>
  );
}
