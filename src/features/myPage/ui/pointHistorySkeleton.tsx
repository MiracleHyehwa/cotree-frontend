import { Skeleton } from "@/shared/components/ui/skeleton";
import { Coins, Calendar } from "lucide-react";

export default function PointHistorySkeleton() {
  return (
    <div className="w-full max-w-limit bg-background px-4 animate-pulse">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 justify-center text-lg font-semibold text-primary">
          <Coins className="w-5 h-5" />
          포인트 내역
        </div>

        <div>
          <p className="text-sm text-muted-foreground">현재 잔액</p>
          <div className="h-10 w-32 mx-auto bg-muted rounded" />
        </div>
        <p className="text-sm text-muted-foreground">총 --건의 내역</p>
      </div>

      <div className="divide-y overflow-hidden">
        <div className="divide-y overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <div className="flex items-center justify-between px-4 py-4" key={i}>
              <div className="flex items-center gap-4">
                <Skeleton className="w-8 h-8 rounded-full" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-24" />
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-muted-foreground" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
