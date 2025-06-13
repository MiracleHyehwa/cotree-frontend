import { Skeleton } from "@/shared/components/ui/skeleton";

export default function ProductCardListHorizontalSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="w-full max-w-limit bg-background divide-y py-4 px-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={`flex gap-4 items-start py-4 animate-pulse ${index === 0 ? "pt-0" : ""}`}>
          <div className="w-[140px] h-[140px] relative overflow-hidden rounded-md flex-shrink-0">
            <Skeleton className="w-full h-full rounded-md" />
            <Skeleton className="absolute bottom-2 right-2 w-12 h-5 rounded-full" />
          </div>

          <div className="flex flex-col justify-between flex-1 min-w-0 space-y-2">
            <Skeleton className="h-3 w-16 rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-3/4 rounded" />
            <div className="mt-2 space-y-1">
              <div className="flex flex-col gap-1 items-start">
                <Skeleton className="h-3 w-20 rounded" />
                <Skeleton className="h-5 w-12 rounded-full" />
              </div>
              <Skeleton className="h-5 w-24 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
