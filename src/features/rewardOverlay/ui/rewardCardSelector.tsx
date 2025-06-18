import { useMyTreeSummary } from "@/entities/environment/api/hooks";
import { useRewardOverlayContext } from "../hooks/useRewardOverlayContext";
import clsx from "clsx";
import { calculateLevel } from "@/features/environment/utils";

export default function RewardCardSelector() {
  const { setSelectedIndex, setCardCount, setShowOverlay, images } = useRewardOverlayContext();

  const { data } = useMyTreeSummary();
  const currentLevel = calculateLevel(data?.exp ?? 0);

  const unlockLevels = [3, 6, 9, 10];
  const unlockedCount = unlockLevels.filter((level) => currentLevel >= level).length;
  const maxCount = unlockLevels.length;

  return (
    <div className="w-full px-4 max-w-limit mx-auto flex flex-col">
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="text-3xl mb-2">🎉</div>
        <div className="text-base text-foreground text-center">
          <span className="font-semibold text-primary">Lv.{currentLevel}</span> 달성! 현재까지 리워드를 확인해보세요.
        </div>
      </div>

      <div className="grid grid-card-selector grid-cols-2 gap-2">
        {images.slice(0, unlockedCount).map((src, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedIndex(index);
              setCardCount(1);
              setShowOverlay(true);
            }}
            className={clsx(
              "rounded-xl shadow-md border bg-white p-4 cursor-pointer",
              "transition-transform hover:scale-[1.01]"
            )}
          >
            <div className="text-base font-semibold tracking-widest text-[#009987]">HYUNDAI</div>
            <div className="text-sm text-foreground mt-1">친환경 소비 리워드</div>
            <img src={src} alt={`hindy-${index}`} className="mt-4 w-full h-24 object-contain pointer-events-none" />
          </div>
        ))}

        {Array.from({ length: maxCount - unlockedCount }).map((_, i) => (
          <div
            key={`locked-${i}`}
            className="rounded-xl border border-dashed bg-gray-100 p-4 flex flex-col items-center justify-center text-gray-400"
          >
            <div className="text-2xl mb-2">🔒</div>
            <div className="text-sm">Lv.{unlockLevels[unlockedCount + i]} 달성 시 개방</div>
          </div>
        ))}
      </div>
      {unlockedCount < maxCount && (
        <div className="mt-auto pt-6 text-sm text-center text-muted-foreground">
          다음 리워드는 <span className="font-medium text-destructive">Lv.{unlockLevels[unlockedCount]}</span>
          에서 개방돼요!
        </div>
      )}
    </div>
  );
}
