import { useSuspenseQuery } from "@tanstack/react-query";
import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { categoryQueryOptions } from "./queryOptionts";

export const useCategories = (displayMode: DisplayMode = "fallback") => {
  return useSuspenseQuery(categoryQueryOptions.getCategories(displayMode));
};
