import React from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchContext } from "../hooks/useSearchContext";
import { sampleProductMock } from "@/features/product/mocks/sampleProductMock";
import { SearchInput, SearchRecentKeyword, SearchResult } from "@/features/search/ui";

interface SlotProps {
  children: React.ReactNode;
}

export default function SearchView({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col w-full px-4 gap-6 max-w-limit mx-auto">{children}</div>;
}

function EmptyRecentKeywordMessage() {
  return (
    <p className="text-sm text-muted-foreground w-full max-wlimit text-center shrink-0 py-4">최근 검색어가 없습니다.</p>
  );
}

function EmptyResultMessage() {
  return <p className="text-sm text-muted-foreground w-full max-w-limit shrink-0 py-4">일치하는 결과가 없습니다.</p>;
}

function WhenIdle({ children }: SlotProps) {
  const [params] = useSearchParams();
  const keyword = params.get("keyword")?.trim();
  if (keyword) return null;
  return <>{children}</>;
}

function WhenActive({ children }: SlotProps) {
  const [params] = useSearchParams();
  const keyword = params.get("keyword")?.trim();
  if (!keyword) return null;
  return <>{children}</>;
}

function WhenHasRecentKeywords({ children }: SlotProps) {
  const { recentKeywords } = useSearchContext();
  if (recentKeywords.length === 0) return null;
  return <>{children}</>;
}

function WhenNoRecentKeywords({ children }: SlotProps) {
  const { recentKeywords } = useSearchContext();
  if (recentKeywords.length > 0) return null;
  return <>{children}</>;
}

function WhenHasResults({ children }: SlotProps) {
  const [params] = useSearchParams();
  const keyword = params.get("keyword")?.trim() ?? "";
  const filtered = sampleProductMock.filter((product) => product.name.toLowerCase().includes(keyword.toLowerCase()));
  if (filtered.length === 0) return null;
  return <>{children}</>;
}

function WhenNoResults({ children }: SlotProps) {
  const [params] = useSearchParams();
  const keyword = params.get("keyword")?.trim() ?? "";
  const filtered = sampleProductMock.filter((product) => product.name.toLowerCase().includes(keyword.toLowerCase()));
  if (filtered.length > 0) return null;
  return <>{children}</>;
}

SearchView.Input = SearchInput;
SearchView.RecentKeywords = SearchRecentKeyword;
SearchView.ResultList = SearchResult;
SearchView.EmptyRecentKeywordMessage = EmptyRecentKeywordMessage;
SearchView.EmptyResultMessage = EmptyResultMessage;
SearchView.WhenIdle = WhenIdle;
SearchView.WhenActive = WhenActive;
SearchView.WhenHasRecentKeywords = WhenHasRecentKeywords;
SearchView.WhenNoRecentKeywords = WhenNoRecentKeywords;
SearchView.WhenHasResults = WhenHasResults;
SearchView.WhenNoResults = WhenNoResults;
