import { Skeleton } from "@/shared/components/ui/skeleton";

export default function ProductCardGridSkeleton() {
  return (
    <div className="w-full max-w-limit px-4">
      <div className="grid grid-cols-2 gap-4 py-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="w-full aspect-[3/4] rounded-md" />
            <Skeleton className="h-4 w-2/3 rounded-sm" />
            <Skeleton className="h-4 w-3/4 rounded-sm" />
            <Skeleton className="h-5 w-1/2 rounded-sm" />
          </div>
        ))}
      </div>
    </div>
  );
}
