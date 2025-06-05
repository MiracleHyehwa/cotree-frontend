import { useRewardOverlayContext } from "../hooks/useRewardOverlayContext";
import clsx from "clsx";

export default function RewardCardSelector() {
  const { setSelectedIndex, setCardCount, setShowOverlay, images } = useRewardOverlayContext();

  return (
    <div className="w-full px-4 py-8 grid grid-card-selector grid-cols-2 gap-4 max-w-limit mx-auto">
      {images.map((src, index) => (
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
          <div className="text-sm text-[#1B2A33] mt-1">친환경 소비 리워드</div>
          <img src={src} alt={`hindy-${index}`} className="mt-4 w-full h-24 object-contain pointer-events-none" />
        </div>
      ))}
    </div>
  );
}
