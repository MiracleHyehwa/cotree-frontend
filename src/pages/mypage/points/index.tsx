import PointHistoryView from "./pointHistoryView";
import OnlyHeaderBackLayout from "@/shared/layout/onlyHeaderBackLayout";

export default function PointHistoryPage() {
  return (
    <OnlyHeaderBackLayout title="포인트 적립 내역">
      <PointHistoryView />
    </OnlyHeaderBackLayout>
  );
}
