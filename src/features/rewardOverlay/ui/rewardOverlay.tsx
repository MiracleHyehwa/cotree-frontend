import { useEffect } from "react";
import { useRewardOverlayContext } from "../hooks/useRewardOverlayContext";
import { Button } from "@/shared/components/ui/button";
import { RewardCardFirst, RewardCardSecond, RewardCardLast, RewardCardThird } from "./index.ts";

interface RewardOverlayProps {
  children: React.ReactNode;
}

export default function RewardOverlay({ children }: RewardOverlayProps) {
  const { showOverlay, setShowOverlay } = useRewardOverlayContext();

  useEffect(() => {
    if (showOverlay) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showOverlay]);

  if (!showOverlay) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center px-4"
      onClick={() => setShowOverlay(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-limit h-[250px] animate-scale-pop flex items-center justify-center"
      >
        {children}
      </div>
    </div>
  );
}

RewardOverlay.CardStack = function CardStack() {
  const { selectedIndex } = useRewardOverlayContext();

  switch (selectedIndex) {
    case 0:
      return <RewardCardFirst />;
    case 1:
      return <RewardCardSecond />;
    case 2:
      return <RewardCardThird />;
    case 3:
      return <RewardCardLast />;
    default:
      return null;
  }
};

RewardOverlay.Close = function Close() {
  const { setShowOverlay } = useRewardOverlayContext();

  return (
    <div className="absolute inset-x-0 -bottom-20 flex justify-center z-10 px-4">
      <Button
        onClick={() => setShowOverlay(false)}
        className="text-primary-foreground text-sm hover:opacity-80 w-full max-w-[320px] cursor-pointer"
      >
        닫기
      </Button>
    </div>
  );
};

RewardOverlay.AutoCardAnimation = function AutoCardAnimation() {
  const { setCardCount } = useRewardOverlayContext();

  useEffect(() => {
    let count = 2;
    let increasing = true;

    const interval = setInterval(() => {
      setCardCount(count);

      if (increasing) {
        count++;
        if (count >= 10) increasing = false;
      } else {
        count--;
        if (count <= 2) increasing = true;
      }
    }, 300);

    return () => clearInterval(interval);
  }, [setCardCount]);

  return null;
};
