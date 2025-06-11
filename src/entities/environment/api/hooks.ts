import { useSuspenseQuery } from "@tanstack/react-query";
import { environmentQueryOptions } from "./queryOptions";
import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { MyTreeResponse } from "../model";

export const useMyTree = (displayMode: DisplayMode = "fallback") => {
  return useSuspenseQuery<MyTreeResponse>(environmentQueryOptions.getMyTree(displayMode));
};
