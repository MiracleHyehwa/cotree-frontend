import { OnlyHeaderBackLayout } from "@/shared/layout";
import PointHistoryView from "./pointHistoryView";

export default function PointHistoryPage() {
  return (
    <OnlyHeaderBackLayout title="포인트 적립 내역">
      <PointHistoryView />
    </OnlyHeaderBackLayout>
  );
}
