import { SearchProvider } from "@/features/search/context";
import { SearchView } from "@/features/search/ui";
import { SearchLayout } from "@/shared/layout";

export default function SearchPage() {
  return (
    <SearchProvider>
      <SearchLayout>
        <SearchView>
          <SearchView.Input />

          <SearchView.WhenIdle>
            <SearchView.WhenHasRecentKeywords>
              <SearchView.RecentKeywords />
            </SearchView.WhenHasRecentKeywords>

            <SearchView.WhenNoRecentKeywords>
              <SearchView.EmptyRecentKeywordMessage />
            </SearchView.WhenNoRecentKeywords>
          </SearchView.WhenIdle>

          <SearchView.WhenActive>
            <SearchView.WhenHasResults>
              <SearchView.ResultList />
            </SearchView.WhenHasResults>

            <SearchView.WhenNoResults>
              <SearchView.EmptyResultMessage />
            </SearchView.WhenNoResults>
          </SearchView.WhenActive>
        </SearchView>
      </SearchLayout>
    </SearchProvider>
  );
}
