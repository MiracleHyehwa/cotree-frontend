import { useState } from "react";

export default function RewardCardSecond() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full max-w-[400px] aspect-[8/5] mx-auto">
      <div
        className="relative w-full h-full [perspective:1000px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="relative w-full h-full [transform-style:preserve-3d] transition-all duration-500 ease-out"
          style={{
            transform: isHovered
              ? "rotateY(5deg) rotateX(-3deg) translateZ(10px)"
              : "rotateY(0deg) rotateX(0deg) translateZ(0px)",
          }}
        >
          <div
            className="absolute inset-0 rounded-2xl bg-black/10 blur-sm"
            style={{ transform: "translateZ(-5px) translateY(8px)" }}
          />

          <div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-50 border border-green-200"
            style={{ transform: "translateZ(0px)" }}
          />

          <div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-50 to-white border border-white/80"
            style={{ transform: "translateZ(8px)" }}
          />

          <div
            className="absolute inset-0 rounded-2xl border border-white/60 overflow-hidden"
            style={{
              transform: "translateZ(16px)",
              background: "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 0%, transparent 50%),
                  radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 0%, transparent 50%)
                `,
              }}
            />

            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)",
                animation: "ripple 3s ease-in-out infinite",
                transform: isHovered ? "translateX(50px)" : "translateX(-100px)",
                transition: "transform 0.8s ease-out",
              }}
            />

            <div className="relative w-full h-full p-6 flex flex-col text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm font-bold tracking-widest opacity-90">HYUNDAI</div>
                  <div className="text-xs opacity-70 mt-1">ECO REWARDS</div>
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="text-6xl mb-3 animate-bounce" style={{ animationDuration: "2s" }}>
                  👜
                </div>
                <div className="text-2xl font-bold mb-2">에코백</div>
                <div className="text-sm opacity-80 text-center">교환권</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
