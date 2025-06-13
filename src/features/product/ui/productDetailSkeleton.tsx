import { Skeleton } from "@/shared/components/ui/skeleton";

export default function ProductDetailSkeleton() {
  return (
    <div>
      <div className="aspect-square w-full bg-muted/50 animate-pulse" />

      <div className="w-full max-w-limit mx-auto bg-background pb-12 px-4 py-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="w-12 h-5 rounded-full" />
            <Skeleton className="w-20 h-4 rounded" />
          </div>
          <Skeleton className="w-3/4 h-5 rounded" />
          <div className="space-y-1">
            <Skeleton className="w-24 h-4 rounded" />
            <Skeleton className="w-32 h-6 rounded" />
            <Skeleton className="w-16 h-4 rounded" />
          </div>
        </div>

        <div className="h-px bg-border my-4" />

        <div className="space-y-3">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex justify-between text-sm">
              <Skeleton className="w-20 h-4 rounded" />
              <Skeleton className="w-24 h-4 rounded" />
            </div>
          ))}
        </div>

        <div className="h-px bg-border my-4" />

        <div className="space-y-4 mt-4">
          {[1, 2, 3].map((_, i) => (
            <Skeleton key={i} className="w-full h-4 rounded" />
          ))}
          {[1, 2].map((_, i) => (
            <Skeleton key={i} className="w-full aspect-[4/3] rounded-lg" />
          ))}
        </div>
      </div>
      <div className="w-full max-w-limit fixed bottom-0 left-1/2 -translate-x-1/2 bg-background border-t border-border z-50">
        <div className="max-w-limit mx-auto px-4 py-4">
          <div className="w-full flex gap-3">
            <Skeleton className="flex-1 max-w-[25%] h-12 bg-muted" />
            <Skeleton className="flex-3 h-12 rounded-md bg-primary/50" />
          </div>
        </div>
      </div>
    </div>
  );
}
