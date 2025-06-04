import { SearchProvider } from "@/features/search/context";
import { SearchInput, SearchRecentKeyword, SearchResult, SearchContent } from "@/features/search/ui";
import SearchLayout from "@/shared/layout/searchLayout";

export default function SearchPage() {
  return (
    <SearchProvider>
      <SearchLayout>
        <SearchInput />
        <SearchContent>
          <SearchContent.WhenEmpty>
            <SearchRecentKeyword />
          </SearchContent.WhenEmpty>
          <SearchContent.WhenResult>
            <SearchResult />
          </SearchContent.WhenResult>
        </SearchContent>
      </SearchLayout>
    </SearchProvider>
  );
}
