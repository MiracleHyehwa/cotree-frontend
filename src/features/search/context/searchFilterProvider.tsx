import { useState, useCallback } from "react";
import { SearchFilterContext } from "./searchFilterContext";

interface SearchFilterProviderProps {
  children: React.ReactNode;
}

export default function SearchFilterProvider({ children }: SearchFilterProviderProps) {
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [isGreen, setIsGreen] = useState<boolean | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const resetFilters = useCallback(() => {
    setCategoryId(null);
    setIsGreen(null);
  }, []);

  return (
    <SearchFilterContext.Provider
      value={{
        categoryId,
        isGreen,
        setCategoryId,
        setIsGreen,
        resetFilters,
        isBottomSheetOpen,
        setIsBottomSheetOpen,
      }}
    >
      {children}
    </SearchFilterContext.Provider>
  );
}
