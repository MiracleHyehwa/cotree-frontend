import { Coins, TrendingUp, TrendingDown, Calendar } from "lucide-react";

interface PointItem {
  date: string;
  amount: number;
}

interface PointHistoryProps {
  items: PointItem[];
  children: React.ReactNode;
}

export default function PointHistory({ items, children }: PointHistoryProps) {
  return (
    <div className="w-full max-w-limit bg-background px-4">
      {children}
      <div className="divide-y overflow-hidden">
        {items.map((item, i) => (
          <PointHistoryItem key={i} {...item} />
        ))}
      </div>
    </div>
  );
}

function PointHistoryItem({ amount, date }: { amount: number; date: string }) {
  const isEarned = amount > 0;
  const sign = isEarned ? "+" : "-";
  const formattedAmount = Math.abs(amount).toLocaleString();
  const icon = isEarned ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />;
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
            {date}
          </span>
        </div>
      </div>
      <div className={`text-sm font-semibold ${amountClass}`}>
        {sign}
        {formattedAmount}P
      </div>
    </div>
  );
}
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

function Stats({ total, count }: { total: number; count: number }) {
  return (
    <>
      <div>
        <p className="text-sm text-muted-foreground">현재 잔액</p>
        <p className="text-4xl font-bold text-foreground">{total.toLocaleString()}P</p>
      </div>
      <p className="text-sm text-muted-foreground">총 {count}건의 내역</p>
    </>
  );
}

PointHistory.Header = Header;
PointHistory.Title = Title;
PointHistory.Stats = Stats;
