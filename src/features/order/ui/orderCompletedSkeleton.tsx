import { Skeleton } from "@/shared/components/ui/skeleton";

export default function OrderCompletedSkeleton() {
  return (
    <div className="w-full max-w-limit mx-auto p-4 space-y-2 pb-16">
      <div className="text-center space-y-2 py-2">
        <Skeleton className="w-12 h-12 rounded-full mx-auto" />
        <Skeleton className="h-5 w-40 mx-auto" />
      </div>

      <div className="text-sm border-b py-2">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-5 w-36" />
        </div>
      </div>

      <div className="space-y-2 border-b py-4">
        <Skeleton className="h-5 w-24" />
        {[...Array(2)].map((_, idx) => (
          <div className="flex gap-4" key={idx}>
            <Skeleton className="w-20 h-25 rounded-md" />
            <div className="flex-1 space-y-2 py-1">
              <Skeleton className="h-4 w-3/5" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-5 w-1/3" />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2 text-sm border-b py-4">
        <Skeleton className="h-5 w-24" />
        {[...Array(4)].map((_, idx) => (
          <div className="flex justify-between items-center gap-4" key={idx}>
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-40" />
          </div>
        ))}
      </div>

      <section className="space-y-2 text-sm py-4">
        <Skeleton className="h-5 w-24" />
        <div className="flex justify-between items-center text-base font-semibold">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </section>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-limit border-t border-border bg-background z-50">
        <div className="flex gap-3 p-4">
          <Skeleton className="h-12 flex-1 rounded" />
        </div>
      </div>
    </div>
  );
}
