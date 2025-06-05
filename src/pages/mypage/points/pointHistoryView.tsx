import { TrendingUp, TrendingDown, Calendar, Coins } from "lucide-react";

const dummy = [
  { date: "2025.06.01", amount: 1000 },
  { date: "2025.06.02", amount: -500 },
  { date: "2025.06.03", amount: 1500 },
  { date: "2025.06.01", amount: 1000 },
  { date: "2025.06.02", amount: -500 },
  { date: "2025.06.03", amount: 1500 },
  { date: "2025.06.04", amount: -700 },
  { date: "2025.06.01", amount: 1000 },
  { date: "2025.06.02", amount: -500 },
  { date: "2025.06.03", amount: 1500 },
  { date: "2025.06.04", amount: -700 },
  { date: "2025.06.01", amount: 1000 },
  { date: "2025.06.02", amount: -500 },
  { date: "2025.06.03", amount: 1500 },
  { date: "2025.06.04", amount: -700 },
  { date: "2025.06.01", amount: 1000 },
  { date: "2025.06.02", amount: -500 },
  { date: "2025.06.03", amount: 1500 },
  { date: "2025.06.04", amount: -700 },
  { date: "2025.06.01", amount: 1000 },
  { date: "2025.06.02", amount: -500 },
  { date: "2025.06.03", amount: 1500 },
  { date: "2025.06.04", amount: -700 },

  { date: "2025.06.04", amount: -700 },
];

export default function PointHistoryView() {
  const totalBalance = dummy.reduce((acc, item) => acc + item.amount, 0);

  return (
    <div className="w-full max-w-limit bg-background px-4">
      <div className="w-full mx-auto">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-primary font-semibold text-lg">
            <Coins className="w-5 h-5" />
            포인트 내역
          </div>

          <div>
            <p className="text-sm text-muted-foreground">현재 잔액</p>
            <p className="text-4xl font-bold text-foreground">{totalBalance.toLocaleString()}P</p>
          </div>

          <p className="text-sm text-muted-foreground">총 {dummy.length}건의 내역</p>
        </div>

        <div className="divide-y overflow-hidden">
          {dummy.map((item, i) => {
            const isEarned = item.amount > 0;
            const formattedAmount = Math.abs(item.amount).toLocaleString();

            return (
              <div key={i} className="flex items-center justify-between px-4 py-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-full ${
                      isEarned ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {isEarned ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                      {isEarned ? "포인트 적립" : "포인트 사용"}
                    </span>
                    <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                  </div>
                </div>

                <div className={`text-sm font-semibold ${isEarned ? "text-primary" : "text-destructive"}`}>
                  {isEarned ? "+" : "-"}
                  {formattedAmount}P
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
