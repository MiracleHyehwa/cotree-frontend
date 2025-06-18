export default function RewardCardLast() {
  return (
    <div className="relative w-full max-w-[400px] aspect-[8/5] [transform-style:preserve-3d] animate-card-isometric">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300/30 [transform:translateZ(0px)]" />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 border border-white/50 [transform:translateZ(15px)]" />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 border border-white/60 [transform:translateZ(30px)]" />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 text-white border border-white/70 p-6 flex flex-col items-center justify-center [transform:translateZ(45px)] shadow-xl overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-cyan-400/20 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10">
          <div className="text-3xl sm:text-4xl font-bold tracking-wide text-center mb-2 bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
            ₩100,000
          </div>
          <div className="text-sm sm:text-base text-center opacity-80">상품권</div>
        </div>

        {/* 미니멀한 포인트 */}
        <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-cyan-400/60 rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-6 left-6 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
    </div>
  );
}
