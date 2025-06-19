import { useState } from "react";
import { useRewardOverlayContext } from "../hooks/useRewardOverlayContext";

export default function RewareCardFirst() {
  const { cardCount, selectedIndex, images } = useRewardOverlayContext();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full max-w-[320px] aspect-[8/5] mx-auto [perspective:1000px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {[...Array(cardCount)].map((_, i) => {
        const offset = i;
        const tx = 4 * offset;
        const ty = -2 * offset;
        const tz = -3 * offset;
        const ry = 0.015 * offset;
        const isTopCard = i === cardCount - 1;

        return (
          <div
            key={i}
            className="absolute inset-0 [transform-style:preserve-3d] transition-all duration-300 ease-out"
            style={{
              transform: `
                translateX(${tx}px)
                translateY(${ty}px)
                translateZ(${tz}px)
                rotateY(${ry}rad)
                ${isHovered && isTopCard ? "translateZ(20px) rotateY(0.1rad)" : ""}
                `,
              zIndex: i,
              opacity: isTopCard ? 1 : 0.92,
            }}
          >
            <div
              className="absolute inset-0 rounded-2xl bg-black/20 blur-lg"
              style={{ transform: "translateZ(-10px) translateY(12px)" }}
            />

            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
                transform: "translateZ(2px)",
              }}
            />

            <div
              className="absolute inset-0 rounded-2xl overflow-hidden border border-gray-200/50"
              style={{
                background: "linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #334155 100%)",
                transform: "translateZ(8px)",
              }}
            >
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `
                    radial-gradient(circle at 30% 20%, rgba(14, 165, 233, 0.4) 0%, transparent 50%),
                    radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.3) 0%, transparent 50%),
                    radial-gradient(circle at 20% 90%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)
                  `,
                }}
              />

              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)",
                  transform: isHovered && isTopCard ? "translateX(100%)" : "translateX(-100%)",
                  transition: "transform 1s ease-out",
                }}
              />

              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: "20px 20px",
                }}
              />

              <div className="relative w-full h-full p-6 flex flex-col text-white">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-lg font-bold tracking-[0.2em] text-cyan-300">HYUNDAI</div>
                    <div className="text-xs text-gray-300 mt-1 tracking-wider">PREMIUM CARD</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-white/20" />
                  </div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="relative">
                    <div className="text-5xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent mb-2">
                      5,000원
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-300/20 via-blue-300/20 to-purple-300/20 blur-xl rounded-lg" />
                  </div>
                  <div className="text-sm text-gray-300 tracking-wider">GIFT VOUCHER</div>
                </div>

                <div className="flex justify-end">
                  <div className="relative">
                    <img
                      src={images[selectedIndex]}
                      alt="brand logo"
                      className="w-20 h-20 object-contain opacity-80 drop-shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent rounded-lg" />
                  </div>
                </div>

                <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <div
                  className="absolute bottom-8 left-6 w-1 h-1 bg-purple-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                />
                <div
                  className="absolute top-20 right-8 w-1 h-1 bg-blue-400 rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
