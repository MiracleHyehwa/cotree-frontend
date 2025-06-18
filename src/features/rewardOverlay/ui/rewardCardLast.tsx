export default function RewardCardLast() {
  return (
    <div className="relative w-full max-w-[400px] aspect-[8/5] [transform-style:preserve-3d] animate-card-isometric">
      <div className="absolute inset-0 rounded-xl bg-card border border-border [transform:translateZ(0px)]" />
      <div className="absolute inset-0 rounded-xl bg-muted border border-white [transform:translateZ(15px)]" />
      <div className="absolute inset-0 rounded-xl bg-[oklch(0.4_0.01_285)] border border-white [transform:translateZ(30px)]" />
      <div className="absolute inset-0 rounded-xl bg-[oklch(0.25_0.01_285)] text-white border border-white p-6 flex flex-col items-center justify-center [transform:translateZ(45px)]">
        <div className="text-3xl sm:text-4xl font-bold tracking-wide text-center">₩100,000</div>
        <div className="text-sm sm:text-base text-center mt-2 opacity-80">상품권</div>
      </div>
    </div>
  );
}
