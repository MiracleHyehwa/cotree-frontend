import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { ArrowLeft, SearchIcon } from "lucide-react";
import SearchLayout from "@/shared/layout/searchLayout";
import { useEffect, useState } from "react";
import { useDragPreventClick, useDragScroll } from "@/shared/hooks";
import { useAuthenticatedNavigate } from "@/features/auth/hooks";

const STORAGE_KEY = "cotree-recent-search";

export default function SearchPage() {
  const navigate = useAuthenticatedNavigate();

  const { onMouseDown, onMouseMove, onMouseUp, inActive } = useDragScroll();
  const { handleMouseDown, handleMouseMove } = useDragPreventClick();

  const [inputValue, setInputValue] = useState("");
  const [recentKeywords, setRecentKeywords] = useState<string[]>([]);
  const [isComposing, setIsComposing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setRecentKeywords(JSON.parse(saved));
    }
  }, []);

  const saveToLocalStorage = (keywords: string[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(keywords));
  };
  const handleSearch = (value: string) => {
    const keyword = value.trim();
    if (!keyword) return;

    setInputValue("");

    if (recentKeywords.includes(keyword)) return;

    const next = [keyword, ...recentKeywords].slice(0, 10);
    setRecentKeywords(next);
    saveToLocalStorage(next);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isComposing) {
      e.preventDefault();
      handleSearch(inputValue);
    }
  };

  const handleCompositionStart = () => setIsComposing(true);
  const handleCompositionEnd = () => setIsComposing(false);

  const clearRecent = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRecentKeywords([]);
  };

  return (
    <SearchLayout>
      <div className="fixed inset-0 flex flex-col items-center justify-start overflow-y-auto z-30 overscroll-none">
        <div className="flex w-full max-w-limit flex-1 flex-col items-stretch justify-start pb-safe-bottom pt-[52px]">
          <div className="fixed left-0 right-0 top-0 z-20 flex flex-col items-center justify-center h-[52px] min-h-[52px] max-h-[52px]">
            <div className="flex w-full max-w-limit flex-1 items-end justify-center gap-2 bg-background pl-3 pr-4">
              <Button
                type="button"
                className="flex h-10 w-10 items-center justify-center p-2 cursor-pointer"
                variant={"link"}
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
                      <Button
                        size={"icon"}
                        variant={"link"}
                        className="text-foreground cursor-pointer"
                        onClick={() => handleSearch(inputValue)}
                      >
                        <SearchIcon className="w-6 h-6" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-between bg-background pb-5">
            <div className="flex w-full flex-row items-center justify-between gap-2 px-4 pb-4 pt-5 h-16 max-h-16">
              <p className="text-base text-foreground">최근 검색어</p>
              {recentKeywords.length > 0 && (
                <Button
                  type="button"
                  variant={"link"}
                  className="py-2 text-xs text-primary cursor-pointer"
                  onClick={clearRecent}
                >
                  모두 지우기
                </Button>
              )}
            </div>

            {recentKeywords.length === 0 ? (
              <p className="text-sm text-muted-foreground w-full text-center shrink-0">최근 검색어가 없습니다.</p>
            ) : (
              <div
                role="presentation"
                className="overflow-x-auto overflow-y-hidden flex w-full shrink-0 items-start gap-2 px-4"
                onMouseDown={(e) => {
                  onMouseDown(e);
                  handleMouseDown();
                }}
                onMouseMove={(e) => {
                  onMouseMove(e);
                  handleMouseMove();
                }}
                onMouseUp={onMouseUp}
                onMouseLeave={inActive}
              >
                {recentKeywords.map((keyword) => (
                  <Button
                    size="sm"
                    variant={"link"}
                    key={keyword}
                    onClick={() => setInputValue(keyword)}
                    className="flex-shrink-0 whitespace-nowrap min-w-max rounded-full border px-3 py-2 text-sm text-foreground cursor-pointer"
                  >
                    {keyword}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </SearchLayout>
  );
}
