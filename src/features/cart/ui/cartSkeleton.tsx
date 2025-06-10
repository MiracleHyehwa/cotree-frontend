import { Skeleton } from "@/shared/components/ui/skeleton";

export default function CartSkeleton() {
  return (
    <>
      <div className="flex items-center justify-between border-b px-4 py-3 animate-pulse">
        <div className="flex items-center gap-2">
          <Skeleton className="w-5 h-5 rounded" />
          <Skeleton className="w-32 h-5 rounded bg-muted" />
        </div>
      </div>

      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="border-b px-4 py-4 animate-pulse">
          <div className="flex items-start gap-4">
            <Skeleton className="w-5 h-5 rounded shrink-0" />
            <Skeleton className="w-32 h-32 rounded-md border shrink-0" />

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="w-12 h-5 rounded bg-muted" />
                <Skeleton className="w-20 h-4 rounded bg-muted/70" />
              </div>

              <Skeleton className="w-3/4 h-4 rounded bg-muted/70" />
              <Skeleton className="w-2/3 h-4 rounded bg-muted/60" />

              <div className="text-xs text-muted-foreground">
                수량: <Skeleton className="inline-block w-6 h-3 ml-1 rounded bg-muted/50" />
              </div>

              <div className="space-y-1">
                <Skeleton className="w-24 h-6 rounded bg-muted/80" />
                <Skeleton className="w-20 h-3 rounded bg-muted/50" />
              </div>

              <Skeleton className="w-32 h-3 rounded bg-muted/40" />
            </div>

            <Skeleton className="w-6 h-6 rounded shrink-0 mt-1 bg-muted" />
          </div>
        </div>
      ))}

      <div className="w-full max-w-limit fixed bottom-0 left-1/2 -translate-x-1/2 bg-background border-t border-border z-50">
        <div className="max-w-limit mx-auto px-4 py-4">
          <div className="w-full flex gap-3">
            <Skeleton className="w-full h-12 rounded-md bg-primary/80" />
          </div>
        </div>
      </div>
    </>
  );
}
