import { CommonLayout } from "@/shared/layout";
import OrderCompletedView from "./orderCompletedView";

export default function OrderCompletedPage() {
  return (
    <CommonLayout title="주문 완료">
      <OrderCompletedView />
    </CommonLayout>
  );
}
