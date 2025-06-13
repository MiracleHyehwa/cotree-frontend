export default function HomeCategorySwiperErrorFallback() {
  return (
    <div className="w-full max-w-limit mx-auto px-4 py-6 text-center text-sm text-destructive">
      카테고리를 불러오지 못했어요.
      <br />
      <button
        className="mt-2 px-3 py-1 border rounded text-xs hover:underline"
        onClick={() => window.location.reload()}
      >
        다시 시도
      </button>
    </div>
  );
}
