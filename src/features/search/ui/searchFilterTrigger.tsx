import { Button } from "@/shared/components/ui/button";
import { useSearchFilterContext } from "../hooks";
import { useCategories } from "@/entities/category/api/hooks";

export default function SearchFilterTrigger() {
  const { setIsBottomSheetOpen, categoryId } = useSearchFilterContext();
  const { data: categories = [] } = useCategories();

  const selectedCategory = categories.find((cat) => String(cat.id) === categoryId);
  const label = selectedCategory ? selectedCategory.name : "카테고리";

  const handleOpenBottomSheet = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setIsBottomSheetOpen(true);
  };

  return (
    <Button
      variant={selectedCategory ? "default" : "outline"}
      size="sm"
      onClick={handleOpenBottomSheet}
      className="w-fit text-sm rounded-full px-3 py-1 flex items-center gap-1 cursor-pointer"
    >
      {label}
    </Button>
  );
}
