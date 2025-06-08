import { useSearchContext } from "../hooks/useSearchContext";
import { Button } from "@/shared/components/ui/button";
import { useDragPreventClick, useDragScroll } from "@/shared/hooks";

export default function SearchRecentKeyword() {
  const { recentKeywords, setInputValue, clearRecentKeywords } = useSearchContext();

  const { onMouseDown, onMouseMove, onMouseUp, inActive } = useDragScroll();
  const { handleMouseDown, handleMouseMove } = useDragPreventClick();

  return (
    <div className="flex w-full flex-col items-center justify-between bg-background pb-5">
      <div className="flex w-full flex-row items-center justify-between gap-2 pb-4 pt-5 h-16 max-h-16">
        <p className="text-base text-foreground">최근 검색어</p>
        <Button
          type="button"
          variant="link"
          className="text-xs text-muted-foreground cursor-pointer"
          onClick={clearRecentKeywords}
        >
          모두 지우기
        </Button>
      </div>

      <div
        role="presentation"
        className="overflow-x-auto overflow-y-hidden flex w-full shrink-0 items-start gap-2"
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
            key={keyword}
            variant="outline"
            onClick={() => setInputValue(keyword)}
            className="flex-shrink-0 whitespace-nowrap min-w-max rounded-full border text-sm text-foreground cursor-pointer"
          >
            {keyword}
          </Button>
        ))}
      </div>
    </div>
  );
}
