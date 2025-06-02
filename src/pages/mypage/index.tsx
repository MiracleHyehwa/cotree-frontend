import { CommonLayout } from "@/shared/layout";
import { User, Gift, Package, Truck, Clock, CreditCard, RefreshCw, ChevronRight } from "lucide-react";

const user = {
  name: "한*준",
  profileImage: "https://placehold.co/64x64.png",
  point: 10000,
};

const orderStatuses = [
  { label: "주문접수", count: 0, icon: Clock },
  { label: "결제완료", count: 0, icon: CreditCard },
  { label: "상품준비중", count: 0, icon: Package },
  { label: "배송완료", count: 0, icon: Truck },
];

const menuItems = [
  {
    label: "주문내역",
    icon: Package,
    description: "주문한 상품을 확인하세요",
  },
  {
    label: "취소/교환/반품 조회",
    icon: RefreshCw,
    description: "취소, 교환, 반품 현황",
  },
  {
    label: "쿠폰함",
    icon: Gift,
    description: "사용 가능한 쿠폰 확인",
  },
  {
    label: "포인트 내역",
    icon: User,
    description: "포인트 적립/사용 내역",
  },
];

export default function MyPage() {
  return (
    <CommonLayout title="마이페이지">
      <section className="py-6 space-y-6">
        <div className="flex items-center gap-4 px-4">
          <div className="relative">
            <img
              src={user.profileImage}
              alt="프로필 이미지"
              className="w-20 h-20 rounded-full object-cover border-4 border-primary/20"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-sm">
              <User className="w-3 h-3 text-primary-foreground" />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xl font-bold text-foreground mb-1">{user.name} 님</p>
            <p className="text-sm text-muted-foreground">안녕하세요! 좋은 하루 되세요 ✨</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 px-4">
          <div
            className="bg-gradient-to-r from-[#A8E6CF] to-[#DCEDC1] hover:from-[#81C784] hover:to-[#A5D6A7]
               p-4 rounded-xl flex items-center justify-between shadow-md transition-transform hover:scale-105 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌳</span>
              <p className="text-base font-semibold text-foreground">내 나무 보러가기</p>
            </div>
            <ChevronRight className="w-4 h-4 text-foredground" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 px-4">
          <div className="bg-primary p-4 rounded-xl text-primary-foreground">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">P</span>
              </div>
              <p className="text-sm font-medium">그린포인트</p>
            </div>
            <p className="text-2xl font-bold">{user.point.toLocaleString()}P</p>
          </div>
        </div>

        <div className="px-4">
          <h3 className="text-lg font-bold text-foreground mb-4">주문/배송 조회</h3>
          <div className="grid grid-cols-2 gap-3">
            {orderStatuses.map(({ label, count, icon: Icon }) => (
              <div
                key={label}
                className="text-center p-4 bg-muted rounded-xl hover:bg-muted transition-colors cursor-pointer group"
              >
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center border border-border">
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground mb-1">{count}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <section className="w-full">
          <h3 className="text-lg font-bold text-foreground px-4">빠른 메뉴</h3>
          <ul className="w-full divide-y divide-border">
            {menuItems.map(({ label, description, icon: Icon }) => (
              <li key={label}>
                <button className="w-full flex items-center justify-between hover:bg-muted/50 transition-colors py-4 px-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground">{description}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </CommonLayout>
  );
}
