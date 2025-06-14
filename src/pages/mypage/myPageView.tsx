import { useMemberDashboard } from "@/entities/member/api/hooks";
import { EditProfileDialog, MyPage } from "@/features/myPage/ui";
import { AgeRange, Gender } from "@/shared/constants";
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
  const {
    nickname: name,
    gender,
    ageRange: age,
    profileImage,
    greenPoint: point,
    orderStatusPendingCount,
    orderStatusPaidCount,
  } = data;
  const user = { name, profileImage, point };

  const orderStatuses = [
    { status: "ALL", count: orderStatusPendingCount + orderStatusPaidCount },
    { status: "PENDING", count: orderStatusPendingCount },
    { status: "PAID", count: orderStatusPaidCount },
  ] as const;

  return (
    <MyPage>
      <MyPage.Profile user={user}>
        {({ open, setOpen }) => (
          <EditProfileDialog
            open={open}
            setOpen={setOpen}
            defaultValues={{
              name,
              gender: gender as Gender,
              age: age as AgeRange,
              profileImage,
            }}
          />
        )}
      </MyPage.Profile>

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
