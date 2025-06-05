import { createContext, Dispatch, SetStateAction } from "react";

interface RewardOverlayContextProps {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  cardCount: number;
  setCardCount: Dispatch<SetStateAction<number>>;
  showOverlay: boolean;
  setShowOverlay: Dispatch<SetStateAction<boolean>>;

  images: string[];
}

export const RewardOverlayContext = createContext<RewardOverlayContextProps | null>(null);
