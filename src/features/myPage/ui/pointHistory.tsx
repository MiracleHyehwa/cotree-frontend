import type { PointHistoryItem } from "@/entities/greenpoint/model";
import { Coins, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { memo, useMemo } from "react";

interface PointHistoryProps {
  histories: PointHistoryItem[];
  children: React.ReactNode;
}

export default function PointHistory({ histories, children }: PointHistoryProps) {
  const isEmpty = histories.length === 0;

  return (
    <div className="w-full max-w-limit bg-background px-4 flex flex-col flex-1 items-center">
      {children}

      {isEmpty ? (
        <div className="flex-1 flex items-center justify-center py-12 w-full">
          <div className="flex flex-col items-center gap-2 text-muted-foreground text-center">
            <Coins className="w-8 h-8" />
            <p className="text-base font-medium">포인트 내역이 없습니다.</p>
            <p className="text-sm text-muted-foreground">포인트를 적립하면 이곳에 표시됩니다.</p>
          </div>
        </div>
      ) : (
        <div className="divide-y overflow-hidden w-full">
          {histories.map((history) => (
            <PointHistoryRow key={history.id} {...history} />
          ))}
        </div>
      )}
    </div>
  );
}

export const PointHistoryRow = memo(function PointHistoryRow({
  amount,
  createdAt,
}: {
  amount: number;
  createdAt: string;
}) {
  const isEarned = amount > 0;
  const sign = isEarned ? "+" : "-";
  const formattedAmount = useMemo(() => Math.abs(amount).toLocaleString(), [amount]);
  const icon = useMemo(
    () => (isEarned ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />),
    [isEarned]
  );
  const label = isEarned ? "포인트 적립" : "포인트 사용";
  const badgeClass = isEarned ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive";
  const amountClass = isEarned ? "text-primary" : "text-destructive";

  return (
    <div className="flex items-center justify-between px-4 py-4">
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-full ${badgeClass}`}>{icon}</div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">{label}</span>
          <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {createdAt}
          </span>
        </div>
      </div>
      <div className={`text-sm font-semibold ${amountClass}`}>
        {sign}
        {formattedAmount}P
      </div>
    </div>
  );
});

function Header({ children }: { children: React.ReactNode }) {
  return <div className="text-center space-y-2">{children}</div>;
}

function Title() {
  return (
    <div className="inline-flex items-center gap-2 text-primary font-semibold text-lg">
      <Coins className="w-5 h-5" />
      포인트 내역
    </div>
  );
}

function Stats({ remainPoint, count }: { remainPoint: number; count: number }) {
  return (
    <>
      <div>
        <p className="text-sm text-muted-foreground">현재 잔액</p>
        <p className="text-4xl font-bold text-foreground">{remainPoint.toLocaleString()}P</p>
      </div>
      <p className="text-sm text-muted-foreground">총 {count}건의 내역</p>
    </>
  );
}

PointHistory.Header = Header;
PointHistory.Title = Title;
PointHistory.Stats = Stats;
