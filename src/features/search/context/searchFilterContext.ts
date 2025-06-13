import { createContext } from "react";

export interface SearchFilterContextType {
  categoryId: string | null;
  isGreen: boolean | null;
  setCategoryId: (id: string | null) => void;
  setIsGreen: (value: boolean | null) => void;
  resetFilters: () => void;
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen: (v: boolean) => void;
}

export const SearchFilterContext = createContext<SearchFilterContextType | null>(null);
