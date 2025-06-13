import { Skeleton } from "@/shared/components/ui/skeleton";

export default function ProductCategoryFilterTabsSkeleton() {
  return (
    <div className="sticky left-0 right-0 z-20 overflow-x-auto top-[52px] h-[48px] bg-background">
      <div className="relative flex w-full flex-col items-center justify-center pt-px">
        <div
          className="overflow-x-auto overflow-y-hidden scrollbar-hide flex w-full shrink-0 flex-row items-start relative px-4"
          role="presentation"
        >
          <div className="flex gap-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="w-16 h-8 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
