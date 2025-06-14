import { usePointHistory, usePointSummary } from "@/entities/greenpoint/api/hooks";
import { useInfiniteScroll } from "@/shared/hooks";
import PointHistory from "@/features/myPage/ui/pointHistory";
import { Spinner } from "@/shared/components/ui/spinner";

export default function PointHistoryView() {
  const { data: summary } = usePointSummary();
  const { data: pointHistories, fetchNextPage, hasNextPage, isFetchingNextPage } = usePointHistory(summary.totalCount);
  const { ref } = useInfiniteScroll({ fetchNextPage, hasNextPage, isFetchingNextPage });
  const histories = pointHistories?.pages.flat() ?? [];

  return (
    <>
      <PointHistory histories={histories}>
        <PointHistory.Header>
          <PointHistory.Title />
          <PointHistory.Stats remainPoint={summary.remainPoint} count={summary.totalCount} />
        </PointHistory.Header>
      </PointHistory>
      <div ref={ref} className="h-8" />
      {isFetchingNextPage && <Spinner />}
    </>
  );
}
