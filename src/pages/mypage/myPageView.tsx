import { MyPage } from "@/features/myPage/ui";
import { User, Package, Gift } from "lucide-react";

const user = {
  name: "한*준",
  profileImage: "https://placehold.co/64x64.png",
  point: 10000,
};

const orderStatuses = [
  { status: "PENDING", count: 0 },
  { status: "PAID", count: 0 },
  { status: "DELIVERED", count: 0 },
] as const;

const menuItems = [
  {
    label: "주문내역",
    icon: Package,
    description: "주문한 상품을 확인하세요",
    to: "/order?status=ALL",
  },
  {
    label: "포인트 내역",
    icon: User,
    description: "포인트 적립/사용 내역",
    to: "/mypage/points",
  },
  {
    label: "받은 리워드",
    icon: Gift,
    description: "지급된 리워드를 확인하세요",
    to: "/mypage/rewards",
  },
];

export default function MyPageView() {
  return (
    <MyPage>
      <MyPage.Profile user={user} />
      <MyPage.GreenTree onClick={() => console.log("나무 보러가기")} />
      <MyPage.Points value={user.point} />

      <MyPage.OrderStatus>
        {orderStatuses.map(({ status, count }) => (
          <MyPage.OrderStatus.Item key={status} status={status} count={count} />
        ))}
      </MyPage.OrderStatus>
      <MyPage.QuickMenu>
        {menuItems.map((item) => (
          <MyPage.QuickMenu.Item key={item.label} {...item} />
        ))}
      </MyPage.QuickMenu>
    </MyPage>
  );
}
