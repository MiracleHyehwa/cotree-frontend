import { useMemberDashboard } from "@/entities/member/api/hooks";
import { MyPage } from "@/features/myPage/ui";
import { api } from "@/shared/lib/api/ky";
import { User, Gift, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const menuItems = [
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
  {
    label: "로그아웃",
    icon: LogOut,
    description: "로그아웃 후 메인페이지로 이동합니다.",
    action: async () => {
      await api.post("auth/logout");
      window.location.href = "/";
    },
  },
];

export default function MyPageView() {
  const navigate = useNavigate();
  const { data } = useMemberDashboard();

  const user = {
    name: data.nickname,
    profileImage: data.profileImage,
    point: data.greenPoint,
  };

  const orderStatuses = [
    { status: "ALL", count: data.orderStatusPendingCount + data.orderStatusPaidCount },
    { status: "PENDING", count: data.orderStatusPendingCount },
    { status: "PAID", count: data.orderStatusPaidCount },
  ] as const;
  return (
    <MyPage>
      <MyPage.Profile user={user} />
      <MyPage.GreenTree onClick={() => navigate("/mypage/environment")} />
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
