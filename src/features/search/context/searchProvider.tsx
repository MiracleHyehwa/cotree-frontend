import { ReactNode, useEffect, useState } from "react";
import { SearchContext } from "./searchContext";

const STORAGE_KEY = "COTREE-RECENT_KEYWORD";

interface Props {
  children: ReactNode;
}

export default function SearchProvider({ children }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [recentKeywords, setRecentKeywords] = useState<string[]>([]);
  const [isComposing, setIsComposing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setRecentKeywords(JSON.parse(saved));
    }
  }, []);

  const saveToLocalStorage = (keywords: string[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(keywords));
  };

  const saveKeyword = (value: string) => {
    const keyword = value.trim();
    if (!keyword) return;

    setInputValue("");

    if (recentKeywords.includes(keyword)) return;

    const next = [keyword, ...recentKeywords].slice(0, 10);
    setRecentKeywords(next);
    saveToLocalStorage(next);
  };

  const handleCompositionStart = () => setIsComposing(true);
  const handleCompositionEnd = () => setIsComposing(false);

  const clearRecentKeywords = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRecentKeywords([]);
  };

  return (
    <SearchContext.Provider
      value={{
        inputValue,
        setInputValue,
        recentKeywords,
        setRecentKeywords,
        isComposing,
        setIsComposing,
        saveKeyword,
        handleCompositionStart,
        handleCompositionEnd,
        clearRecentKeywords,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
