import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Clock, CreditCard, Pencil, Truck } from "lucide-react";

function MyPageRoot({ children }: { children: ReactNode }) {
  return <div className="py-6 space-y-6">{children}</div>;
}

function Profile({ user }: { user: { name: string; profileImage: string } }) {
  return (
    <div className="flex items-center gap-4 px-4">
      <div className="relative">
        <img
          src={user.profileImage}
          alt="프로필 이미지"
          className="w-20 h-20 rounded-full object-cover border-4 border-primary/20"
        />
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-sm cursor-pointer">
          <Pencil className="w-3 h-3 text-primary-foreground" />
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-xl font-bold text-foreground mb-1">{user.name} 님</p>
        <p className="text-sm text-muted-foreground">안녕하세요! 좋은 하루 되세요 ✨</p>
      </div>
    </div>
  );
}

function GreenTree({ onClick }: { onClick: () => void }) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4">
      <div
        onClick={onClick}
        className="bg-gradient-to-r from-primary to-secondary
  hover:to-primary hover:opacity-90 hover:-translate-y-1 hover:shadow-lg
  text-primary-foreground p-4 rounded-xl flex items-center justify-between
  transition-all duration-300 ease-in-out cursor-pointer"
      >
        <div className="flex items-center gap-2" onClick={onClick}>
          <span className="text-2xl">🌳</span>
          <p className="text-base font-semibold text-muted">내 나무 보러가기</p>
        </div>
        <ChevronRight className="w-4 h-4 text-foreground" />
      </div>
    </div>
  );
}

function Points({ value }: { value: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4">
      <div className="bg-primary p-4 rounded-xl text-primary-foreground">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-background rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-foreground">P</span>
          </div>
          <p className="text-sm font-medium">그린포인트</p>
        </div>
        <p className="text-2xl font-bold">{value.toLocaleString()}P</p>
      </div>
    </div>
  );
}

function OrderStatus({ children }: { children: ReactNode }) {
  return (
    <div className="px-4">
      <h3 className="text-lg font-bold text-foreground mb-4">주문/배송 조회</h3>
      <div className="grid grid-cols-3 gap-4">{children}</div>
    </div>
  );
}

function OrderStatusItem({ status, count }: { status: "PENDING" | "PAID" | "DELIVERED"; count: number }) {
  const statusInfo = {
    PENDING: { label: "주문대기", icon: Clock },
    PAID: { label: "결제완료", icon: CreditCard },
    DELIVERED: { label: "배송완료", icon: Truck },
  }[status];

  const Icon = statusInfo.icon;

  return (
    <Link
      to={`/order?status=${status}`}
      className="flex flex-col items-center justify-center aspect-square cursor-pointer"
    >
      <Icon className="w-6 h-6 text-primary mb-2" />
      <p className="text-2xl font-bold text-foreground">{count}</p>
      <p className="text-sm text-muted-foreground mt-1">{statusInfo.label}</p>
    </Link>
  );
}

const OrderStatusWithItem = Object.assign(OrderStatus, {
  Item: OrderStatusItem,
});

function QuickMenu({ children }: { children: ReactNode }) {
  return (
    <section className="w-full">
      <h3 className="text-lg font-bold text-foreground px-4">빠른 메뉴</h3>
      <ul className="w-full divide-y divide-border">{children}</ul>
    </section>
  );
}

function QuickMenuItem({
  label,
  description,
  icon: Icon,
  to,
}: {
  label: string;
  description: string;
  icon: React.ElementType;
  to: string;
}) {
  const navigate = useNavigate();
  return (
    <li>
      <button
        className="w-full flex items-center justify-between hover:bg-muted/50 transition-colors py-4 px-4 cursor-pointer"
        onClick={() => navigate(to)}
      >
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
  );
}

const QuickMenuWithItem = Object.assign(QuickMenu, {
  Item: QuickMenuItem,
});

export const MyPage = Object.assign(MyPageRoot, {
  Profile,
  GreenTree,
  Points,
  OrderStatus: OrderStatusWithItem,
  QuickMenu: QuickMenuWithItem,
});
