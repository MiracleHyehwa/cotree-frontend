import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { ArrowLeft, SearchIcon } from "lucide-react";
import { useSearchContext } from "../hooks/useSearchContext";
import { useAuthenticatedNavigate } from "@/features/auth/hooks";

export default function SearchInput() {
  const navigate = useAuthenticatedNavigate();
  const { isComposing, inputValue, setInputValue, saveKeyword, handleCompositionStart, handleCompositionEnd } =
    useSearchContext();

  const handleSearch = () => {
    const keyword = inputValue.trim();
    if (!keyword) return;
    saveKeyword(keyword);
    navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isComposing) {
      e.preventDefault();

      handleSearch();
    }
  };

  return (
    <div className="fixed left-0 right-0 top-0 z-20 flex flex-col items-center justify-center h-[52px] min-h-[52px] max-h-[52px]">
      <div className="flex w-full max-w-limit flex-1 items-end justify-center gap-2 bg-background pl-3 pr-4">
        <Button
          type="button"
          className="flex h-10 w-10 items-center justify-center p-2 cursor-pointer"
          variant="link"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="!w-6 !h-6" />
        </Button>

        <div className="flex min-w-0 flex-col items-start gap-2 flex-1">
          <div className="relative w-full min-w-0">
            <div className="flex h-10 w-full items-center gap-2 rounded-2xl border border-border bg-muted focus-within:bg-background">
              <Input
                type="text"
                id="cotree-search"
                enterKeyHint="search"
                placeholder="찾고 싶은 식품을 검색해보세요!"
                className="flex-1 h-full bg-transparent text-sm text-foreground placeholder-muted-foreground border-none autofill-hide appearance-none focus-visible:ring-0 focus-visible:outline-none"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
              />
              <div className="flex flex-row items-center justify-center gap-1 pr-2">
                <Button size="icon" variant="link" className="text-foreground cursor-pointer" onClick={handleSearch}>
                  <SearchIcon className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
