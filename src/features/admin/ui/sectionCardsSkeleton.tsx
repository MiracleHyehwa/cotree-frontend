import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

export default function SectionCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="@container/card">
          <CardHeader>
            <CardDescription>
              <Skeleton className="w-24 h-4" />
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              <Skeleton className="w-32 h-8" />
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium items-center">
              <Skeleton className="size-4 rounded-full" />
              <Skeleton className="w-24 h-4" />
            </div>
            <Skeleton className="w-28 h-4" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
