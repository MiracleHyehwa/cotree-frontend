export default function HomeEcoProductSwiperSkeleton() {
  return (
    <div className="w-full max-w-limit mx-auto px-4 py-6 space-y-4">
      <div className="h-6 w-40 bg-muted rounded animate-pulse" />
      <div className="w-full h-48 bg-muted rounded animate-pulse" />
      <div className="divide-y">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-4 py-4 items-center animate-pulse">
            <div className="w-16 h-16 bg-muted rounded" />
            <div className="flex-1 space-y-2">
              <div className="w-20 h-4 bg-muted rounded" />
              <div className="w-32 h-4 bg-muted rounded" />
              <div className="w-24 h-4 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
