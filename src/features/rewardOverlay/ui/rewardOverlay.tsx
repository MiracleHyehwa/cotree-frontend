import { useEffect } from "react";
import { useRewardOverlayContext } from "../hooks/useRewardOverlayContext";
import { Button } from "@/shared/components/ui/button";

interface RewardOverlayProps {
  children: React.ReactNode;
}

export default function RewardOverlay({ children }: RewardOverlayProps) {
  const { showOverlay, setShowOverlay } = useRewardOverlayContext();

  if (!showOverlay) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center px-4"
      onClick={() => setShowOverlay(false)}
    >
      <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-[320px] h-50 animate-scale-pop">
        {children}
      </div>
    </div>
  );
}

RewardOverlay.CardStack = function CardStack() {
  const { cardCount, selectedIndex, images } = useRewardOverlayContext();

  return (
    <>
      {[...Array(cardCount)].map((_, i) => {
        const damped = i / (cardCount - 1 || 1);
        const tx = -12 * damped;
        const ty = -8 * damped;
        const rx = -0.2 * damped;
        const ry = 0.15 * damped;

        return (
          <div
            key={i}
            style={{
              transform: `translateX(${tx}px) translateY(${ty}px) rotateX(${rx}rad) rotateY(${ry}rad)`,
              zIndex: i,
              opacity: i === cardCount - 1 ? 1 : 0.95,
              transition: "transform 0.3s ease-out",
            }}
            className="absolute top-0 left-0 w-full h-full bg-white border border-gray-300 rounded-xl shadow-md p-4"
          >
            <div className="text-base font-semibold tracking-widest text-[#009987]">HYUNDAI</div>
            <div className="text-sm text-[#1B2A33] mt-1">친환경 소비 리워드</div>
            <img
              src={images[selectedIndex]}
              alt="hindy"
              className="absolute bottom-4 right-4 w-24 h-24 object-contain pointer-events-none"
            />
          </div>
        );
      })}
    </>
  );
};

RewardOverlay.Close = function Close() {
  const { setShowOverlay } = useRewardOverlayContext();

  return (
    <div className="absolute inset-x-0 -bottom-28 flex justify-center z-10 px-4">
      <Button
        onClick={() => setShowOverlay(false)}
        className="text-white underline text-sm hover:opacity-80 w-full max-w-[320px]"
      >
        닫기
      </Button>
    </div>
  );
};

RewardOverlay.AutoCardAnimation = function AutoCardAnimation() {
  const { setCardCount } = useRewardOverlayContext();

  useEffect(() => {
    let count = 3;
    let increasing = true;

    const interval = setInterval(() => {
      setCardCount(count);

      if (increasing) {
        count++;
        if (count >= 20) increasing = false;
      } else {
        count--;
        if (count <= 5) increasing = true;
      }
    }, 300);

    return () => clearInterval(interval);
  }, [setCardCount]);

  return null;
};
