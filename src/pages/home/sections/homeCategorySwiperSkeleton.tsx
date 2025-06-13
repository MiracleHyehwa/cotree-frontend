export default function HomeCategorySwiperSkeleton() {
  return (
    <div className="w-full max-w-limit mx-auto px-4 py-6">
      <div className="flex overflow-x-auto">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center w-20 shrink-0 animate-pulse">
            <div className="w-16 h-16 mb-2 rounded-full bg-muted" />
            <div className="w-14 h-4 bg-muted rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
