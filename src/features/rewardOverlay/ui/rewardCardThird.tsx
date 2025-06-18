import { useState, useEffect } from "react";

interface SteamParticle {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
}

interface RewardCardThirdProps {
  className?: string;
  onCardClick?: () => void;
}

interface ParticleStyle {
  width: string;
  height: string;
  left: string;
  top: string;
  animation: string;
}

interface Transform3DStyle {
  transform: string;
}

// 리워드 카드 컴포넌트
export default function RewardCardThird({ className = "", onCardClick }: RewardCardThirdProps = {}) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [steamParticles, setSteamParticles] = useState<SteamParticle[]>([]);
  const [liquidLevel, setLiquidLevel] = useState<number>(0);

  // 증기 파티클 생성
  useEffect((): void => {
    const particles: SteamParticle[] = Array.from(
      { length: 15 },
      (_, i: number): SteamParticle => ({
        id: i,
        x: 45 + Math.random() * 10,
        y: 100,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 2,
        size: 2 + Math.random() * 3,
      })
    );
    setSteamParticles(particles);
  }, []);

  useEffect((): void => {
    if (isHovered) {
      setLiquidLevel(75);
    } else {
      setLiquidLevel(45);
    }
  }, [isHovered]);

  const handleMouseEnter = (): void => {
    setIsHovered(true);
  };

  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };

  const handleCardClick = (): void => {
    if (onCardClick) {
      onCardClick();
    }
  };

  const getTransform3DStyle = (): Transform3DStyle => ({
    transform: isHovered
      ? "rotateY(-8deg) rotateX(5deg) translateZ(15px) scale(1.02)"
      : "rotateY(0deg) rotateX(0deg) translateZ(0px) scale(1)",
  });

  const getShadowStyle = (): Transform3DStyle => ({
    transform: isHovered
      ? "translateZ(-8px) translateY(12px) translateX(5px) scale(0.95)"
      : "translateZ(-5px) translateY(8px) scale(0.98)",
  });

  const getParticleStyle = (particle: SteamParticle): ParticleStyle => ({
    width: `${particle.size}px`,
    height: `${particle.size}px`,
    left: `${particle.x}%`,
    top: `${particle.y}%`,
    animation: `steam ${particle.duration}s ease-out infinite ${particle.delay}s`,
  });

  const getBubbleStyle = (index: number): React.CSSProperties => ({
    left: `${20 + index * 15}%`,
    bottom: `${liquidLevel - 10 + Math.random() * 20}%`,
    animation: `float 2s ease-in-out infinite ${index * 0.3}s`,
  });

  const getTwinkleStyle = (index: number): React.CSSProperties => ({
    animation: `twinkle 3s ease-in-out infinite ${index * 0.2}s`,
  });

  const getEmojiByIndex = (index: number): string => {
    const emojiMap: { [key: number]: string } = {
      0: "💧",
      1: "♨️",
      2: "🌊",
      3: "❄️",
    };
    return emojiMap[index % 4] || "💧";
  };

  return (
    <div className={`relative w-full max-w-[400px] aspect-[8/5] mx-auto ${className}`}>
      <div
        className="relative w-full h-full [perspective:1200px] cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
      >
        <div
          className="relative w-full h-full [transform-style:preserve-3d] transition-all duration-700 ease-out"
          style={getTransform3DStyle()}
        >
          <div
            className="absolute inset-0 rounded-3xl bg-black/15 blur-lg transition-all duration-700"
            style={getShadowStyle()}
          />

          <div
            className="absolute inset-0 rounded-3xl border border-cyan-200 overflow-hidden"
            style={{
              transform: "translateZ(0px)",
              background: "linear-gradient(45deg, #f0f9ff, #e0f2fe, #bae6fd, #7dd3fc)",
            }}
          />

          <div
            className="absolute inset-0 rounded-3xl border border-white/70 overflow-hidden"
            style={{
              transform: "translateZ(12px)",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,249,255,0.8) 50%, rgba(224,242,254,0.9) 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `
                  linear-gradient(45deg, 
                    rgba(255,0,150,0.3) 0%, 
                    rgba(0,255,255,0.3) 25%, 
                    rgba(255,255,0,0.3) 50%, 
                    rgba(255,0,150,0.3) 75%, 
                    rgba(0,255,255,0.3) 100%
                  )
                `,
                animation: "prism 4s linear infinite",
              }}
            />
          </div>

          <div
            className="absolute inset-0 rounded-3xl border border-white/50 overflow-hidden"
            style={{
              transform: "translateZ(24px)",
              background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 30%, #0e7490 70%, #155e75 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `
                  radial-gradient(ellipse at center, rgba(255,255,255,0.4) 0%, transparent 70%),
                  repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 20px,
                    rgba(255,255,255,0.1) 20px,
                    rgba(255,255,255,0.1) 40px
                  )
                `,
                animation: "wave 3s ease-in-out infinite",
              }}
            />

            <div className="relative w-full h-full px-4 py-2 flex flex-col text-white overflow-hidden">
              <div className="flex items-start justify-between mb-4 z-10">
                <div>
                  <div className="text-sm font-bold tracking-widest opacity-90 mb-1">HYUNDAI</div>
                  <div className="text-xs opacity-70 font-medium">THMBLER REWARDS</div>
                </div>
                <div className="relative">
                  <div className="text-2xl animate-pulse">🌡️</div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full animate-ping" />
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center relative">
                <div className="relative">
                  <div
                    className="w-16 h-24 rounded-b-2xl rounded-t-lg border-4 border-white/80 relative overflow-hidden"
                    style={{
                      background: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.4) 100%)",
                    }}
                  >
                    <div
                      className="absolute bottom-0 left-0 right-0 rounded-b-xl transition-all duration-1000 ease-out"
                      style={{
                        height: `${liquidLevel}%`,
                        background: "linear-gradient(180deg, #22d3ee 0%, #06b6d4 50%, #0891b2 100%)",
                        animation: "liquid 2s ease-in-out infinite",
                      }}
                    />

                    {Array.from({ length: 5 }, (_, i: number) => (
                      <div
                        key={`bubble-${i}`}
                        className="absolute w-1 h-1 bg-white/60 rounded-full"
                        style={getBubbleStyle(i)}
                      />
                    ))}
                  </div>

                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-3 bg-white/90 rounded-full border-2 border-white" />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-1 h-8 bg-white/80 rounded-full" />
                  <div className="absolute right-0 top-4 w-4 h-8 border-2 border-white/80 rounded-r-full" />
                </div>

                {steamParticles.map((particle: SteamParticle) => (
                  <div
                    key={`steam-${particle.id}`}
                    className="absolute bg-white/50 rounded-full pointer-events-none"
                    style={getParticleStyle(particle)}
                  />
                ))}
              </div>

              <div className="text-center z-10">
                <div className="text-xl font-bold mb-1">텀블러</div>
                <div className="text-sm opacity-80">교환권</div>
              </div>

           
            </div>

            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="w-full h-full flex flex-wrap">
                {Array.from({ length: 20 }, (_, i: number) => (
                  <div
                    key={`emoji-${i}`}
                    className="w-1/5 h-1/4 flex items-center justify-center text-lg"
                    style={getTwinkleStyle(i)}
                  >
                    {getEmojiByIndex(i)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes prism {
          0%,
          100% {
            transform: translateX(-100%) skewX(-15deg);
          }
          50% {
            transform: translateX(100%) skewX(-15deg);
          }
        }

        @keyframes wave {
          0%,
          100% {
            transform: translateY(0px) scaleY(1);
          }
          50% {
            transform: translateY(-3px) scaleY(1.1);
          }
        }

        @keyframes liquid {
          0%,
          100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(1.05);
          }
        }

        @keyframes steam {
          0% {
            opacity: 0;
            transform: translateY(0px) scale(0.5);
          }
          30% {
            opacity: 1;
            transform: translateY(-20px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-50px) scale(1.5) rotate(180deg);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}
