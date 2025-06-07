import PointHistory from "@/features/myPage/ui/pointHistory";

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
  const total = dummy.reduce((sum, item) => sum + item.amount, 0);

  return (
    <PointHistory items={dummy}>
      <PointHistory.Header>
        <PointHistory.Title />
        <PointHistory.Stats total={total} count={dummy.length} />
      </PointHistory.Header>
    </PointHistory>
  );
}
