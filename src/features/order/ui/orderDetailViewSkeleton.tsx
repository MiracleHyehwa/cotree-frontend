export default function OrderDetailViewSkeleton() {
  return (
    <div className="w-full max-w-limit mx-auto p-4 space-y-4 pb-20 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-5 w-32 bg-muted rounded" />
        <div className="h-6 w-24 bg-muted rounded" />
      </div>

      {[...Array(2)].map((_, i) => (
        <div className="flex gap-4" key={i}>
          <div className="w-20 h-24 bg-muted rounded-md" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 bg-muted rounded" />
            <div className="h-4 w-1/2 bg-muted rounded" />
            <div className="h-4 w-1/3 bg-muted rounded" />
          </div>
        </div>
      ))}

      <div className="space-y-3">
        <div className="h-6 w-24 bg-muted rounded" />
        {[...Array(4)].map((_, i) => (
          <div className="flex justify-between gap-4" key={i}>
            <div className="h-4 w-20 bg-muted rounded" />
            <div className="h-4 w-40 bg-muted rounded" />
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="h-6 w-24 bg-muted rounded" />
        <div className="flex justify-between items-center">
          <div className="h-5 w-24 bg-muted rounded" />
          <div className="h-6 w-28 bg-muted rounded" />
        </div>
        <div className="flex justify-between items-center">
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="h-4 w-20 bg-muted rounded" />
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-limit border-t border-border bg-background z-50">
        <div className="p-4">
          <div className="h-12 bg-primary/80 rounded-md" />
        </div>
      </div>
    </div>
  );
}
