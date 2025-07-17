export default function EventUnavailable() {
  return (
    <div className="flex-1 flex items-center justify-center px-6 py-20">
      <div className="text-center">
        <div className="text-5xl font-bold text-primary leading-none">⏰</div>

        <h1 className="mt-3 text-xl font-semibold text-foreground">특가 이벤트 시간이 아니에요</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          특가 할인은 매일 <span className="font-semibold text-destructive">19:00 ~ 20:00</span>
        </p>
      </div>
    </div>
  );
}
