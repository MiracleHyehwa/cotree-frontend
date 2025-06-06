import { CommonLayout } from "@/shared/layout";
import MyPageView from "./myPageView";

export default function MyPage() {
  return (
    <CommonLayout title="마이페이지">
      <MyPageView />
    </CommonLayout>
  );
}
