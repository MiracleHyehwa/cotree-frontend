import { Suspense } from "react";
import { ProductCard } from "@/features/product/ui/variants";
import { SearchFilterProvider, SearchProvider } from "@/features/search/context";
import { SearchView } from "@/features/search/ui";
import { SearchLayout } from "@/shared/layout";

export default function SearchPage() {
  return (
    <SearchProvider>
      <SearchFilterProvider>
        <SearchLayout>
          <SearchView>
            <SearchView.Input />
            <div className="w-full max-w-limit mt-3 flex items-center gap-2">
              <SearchView.FilterTrigger />
              <SearchView.GreenToggle />
            </div>

            <SearchView.FilterBottomSheet />

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
                <Suspense fallback={<ProductCard.GridSkeleton />}>
                  <SearchView.ResultList />
                </Suspense>
              </SearchView.WhenHasResults>

              <SearchView.WhenNoResults>
                <SearchView.EmptyResultMessage />
              </SearchView.WhenNoResults>
            </SearchView.WhenActive>
          </SearchView>
        </SearchLayout>
      </SearchFilterProvider>
    </SearchProvider>
  );
}
