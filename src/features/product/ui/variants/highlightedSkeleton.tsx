import { Skeleton } from "@/shared/components/ui/skeleton";

export default function ProductCardHighlightedSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 py-4 max-w-limit mx-auto">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="group bg-background rounded overflow-hidden animate-pulse">
          <div className="relative overflow-hidden">
            <div className="aspect-square relative rounded bg-muted">
              <Skeleton className="absolute inset-0 w-full h-full object-cover rounded" />
            </div>

            <div className="absolute top-2 left-2">
              <Skeleton className="w-10 h-5 rounded-full" />
            </div>

            <div className="absolute bottom-2 left-2 right-2">
              <Skeleton className="w-full h-9 rounded-md" />
            </div>
          </div>

          <div className="py-3 space-y-2">
            <div className="h-3 w-16">
              <Skeleton className="h-full rounded" />
            </div>

            <div className="h-4 w-full">
              <Skeleton className="h-full rounded" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Skeleton className="h-3 w-16 rounded" />
                <Skeleton className="h-4 w-8 rounded-full" />
              </div>
              <div className="h-5 w-20">
                <Skeleton className="h-full rounded" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
