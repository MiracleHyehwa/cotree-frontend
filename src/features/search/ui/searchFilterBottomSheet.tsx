import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/components/ui/drawer";
import { Button } from "@/shared/components/ui/button";
import { useSearchFilterContext } from "../hooks";
import { useCategories } from "@/entities/category/api/hooks";
import { useEffect, useState } from "react";

export default function SearchFilterBottomSheet() {
  const { isBottomSheetOpen, setIsBottomSheetOpen, categoryId, setCategoryId } = useSearchFilterContext();
  const { data: categories = [] } = useCategories();

  const [localCategoryId, setLocalCategoryId] = useState<string | null>(categoryId);

  useEffect(() => {
    if (isBottomSheetOpen) {
      setLocalCategoryId(categoryId);
    }
  }, [isBottomSheetOpen, categoryId]);

  const handleApply = () => {
    setCategoryId(localCategoryId);
    setIsBottomSheetOpen(false);
  };

  return (
    <Drawer open={isBottomSheetOpen} onOpenChange={setIsBottomSheetOpen}>
      <DrawerContent className="w-full max-w-limit mx-auto">
        <div className="w-full max-w-limit mx-auto">
          <DrawerHeader>
            <DrawerTitle className="sr-only"></DrawerTitle>
            <DrawerDescription className="sr-only">
              카테고리를 선택하고 친환경 여부를 필터링할 수 있습니다.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 space-y-6">
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={localCategoryId === String(category.id) ? "default" : "outline"}
                    onClick={() =>
                      setLocalCategoryId(localCategoryId === String(category.id) ? null : String(category.id))
                    }
                    size="sm"
                    className="cursor-pointer"
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <DrawerFooter className="grid grid-cols-2">
            <Button className="cursor-pointer" onClick={handleApply}>
              적용
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" className="cursor-pointer">
                닫기
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
