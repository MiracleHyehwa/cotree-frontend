import { Skeleton } from "@/shared/components/ui/skeleton";
import { Clock, CreditCard, Package, User, Gift, LogOut, ChevronRight } from "lucide-react";

export default function MyPageSkeleton() {
  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center gap-4 px-4">
        <Skeleton className="w-20 h-20 rounded-full" />
        <div className="flex flex-col justify-center">
          <Skeleton className="h-6 w-32 mb-1" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 px-4">
        <div
          className="bg-gradient-to-r from-primary to-secondary
        text-primary-foreground p-4 rounded-xl flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Skeleton className="w-6 h-6 rounded-full" />
            <Skeleton className="h-4 w-28" />
          </div>
          <ChevronRight className="w-4 h-4 text-foreground" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 px-4">
        <div className="bg-primary p-4 rounded-xl text-primary-foreground">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-background rounded-full flex items-center justify-center" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-8 w-24" />
        </div>
      </div>

      <div className="px-4">
        <div className="text-lg font-bold text-foreground mb-4">주문/배송 조회</div>
        <div className="grid grid-cols-3 gap-4">
          {[Clock, CreditCard, Package].map((Icon, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center aspect-square cursor-pointer">
              <Icon className="w-6 h-6 text-primary mb-2" />
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-4 w-12 mt-1" />
            </div>
          ))}
        </div>
      </div>

      <section className="w-full">
        <h3 className="text-lg font-bold text-foreground px-4">빠른 메뉴</h3>
        <ul className="w-full divide-y divide-border">
          {[User, Gift, LogOut].map((Icon, idx) => (
            <li key={idx}>
              <div className="w-full flex items-center justify-between py-4 px-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 text-left space-y-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-36" />
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
