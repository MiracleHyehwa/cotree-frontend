import { ReactNode } from "react";
import { useSearchParams } from "react-router-dom";

interface Props {
  children: ReactNode;
}

function SearchWhenEmpty({ children }: Props) {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword")?.trim();
  if (keyword) return null;
  return <>{children}</>;
}

function SearchWhenResult({ children }: Props) {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword")?.trim();
  if (!keyword) return null;
  return <>{children}</>;
}

export default function SearchContent({ children }: Props) {
  return <div className="flex flex-col w-full px-4 gap-6 pt-6">{children}</div>;
}

SearchContent.WhenEmpty = SearchWhenEmpty;
SearchContent.WhenResult = SearchWhenResult;
