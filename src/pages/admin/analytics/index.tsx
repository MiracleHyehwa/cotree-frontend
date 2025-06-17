import { BarChartCustomLabel, BarChartStacked, BarChartVertical, PieChartLabelList } from "@/features/admin/ui/charts";

export default function AdminAnalyticsPage() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2 px-4 lg:px-6 py-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BarChartCustomLabel />
          <BarChartStacked />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BarChartVertical />
          <PieChartLabelList />
          <PieChartLabelList />
        </div>
      </div>
    </div>
  );
}
