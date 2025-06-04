import { createContext } from "react";

interface SearchContextType {
  inputValue: string;
  setInputValue: (v: string) => void;
  recentKeywords: string[];
  setRecentKeywords: (v: string[]) => void;
  isComposing: boolean;
  setIsComposing: (v: boolean) => void;
  saveKeyword: (keyword: string) => void;
  handleCompositionStart: () => void;
  handleCompositionEnd: () => void;
  clearRecentKeywords: () => void;
}

export const SearchContext = createContext<SearchContextType | null>(null);
