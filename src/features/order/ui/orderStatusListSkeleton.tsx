export default function OrderStatusListSkeleton() {
  const dummyOrders = Array.from({ length: 5 });

  return (
    <div className="px-4 py-6">
      {dummyOrders.map((_, orderIdx) => (
        <div key={orderIdx}>
          <div className="h-5 w-32 bg-muted rounded mb-2" />

          <div className="flex items-center justify-between text-sm text-muted-foreground border-b pb-2">
            <div className="h-4 w-48 bg-muted rounded" />
          </div>

          {Array.from({ length: 2 }).map((_, itemIdx) => {
            const isLast = itemIdx === 1;
            return (
              <div key={itemIdx} className={`flex gap-4 py-4 ${!isLast ? "border-b" : ""}`}>
                <div className="w-24 h-24 rounded-md bg-muted" />

                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="h-4 w-3/4 bg-muted rounded" />
                    <div className="h-3 w-1/4 bg-muted rounded" />
                    <div className="h-4 w-1/2 bg-muted rounded" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
