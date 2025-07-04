import { useContext } from "react";
import { SearchContext } from "../context";

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("SearchContext is not provided");
  return context;
};
