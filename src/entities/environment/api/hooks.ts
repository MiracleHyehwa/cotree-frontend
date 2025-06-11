import { environmentQueryOptions } from "./queryOptions";
import { DisplayMode } from "@/shared/lib/api/errors/baseApiError";
import { MyTreeResponse } from "../model";
import { useQuery } from "@tanstack/react-query";

export const useMyTree = (displayMode: DisplayMode = "fallback") => {
  return useQuery<MyTreeResponse>(environmentQueryOptions.getMyTree(displayMode));
};
