import { useState, ReactNode } from "react";
import { RewardOverlayContext } from "./rewardOverlayContext";

const IMAGES = ["/hindy01.png", "/hindy02.png", "/hindy03.png", "/hindy04.png"];

export default function RewardOverlayProvider({ children }: { children: ReactNode }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [cardCount, setCardCount] = useState<number>(5);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  return (
    <RewardOverlayContext.Provider
      value={{
        selectedIndex,
        setSelectedIndex,
        cardCount,
        setCardCount,
        showOverlay,
        setShowOverlay,
        images: IMAGES,
      }}
    >
      {children}
    </RewardOverlayContext.Provider>
  );
}
