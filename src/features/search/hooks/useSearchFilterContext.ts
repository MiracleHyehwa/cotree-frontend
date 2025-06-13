import { useContext } from "react";
import { SearchFilterContext } from "../context/searchFilterContext";

export const useSearchFilterContext = () => {
  const context = useContext(SearchFilterContext);
  if (!context) {
    throw new Error("useSearchFilterContext must be used within a SearchFilterProvider");
  }
  return context;
};
