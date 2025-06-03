import { Button } from "@/shared/components/ui/button";

interface CartOrderActionBarProps {
  selectedCount: number;
}

export default function CartOrderActionBar({ selectedCount }: CartOrderActionBarProps) {
  return (
    <div className="w-full max-w-limit fixed bottom-0 left-1/2 -translate-x-1/2 bg-background border-t border-border z-50">
      <div className="max-w-limit mx-auto px-4 py-4">
        <div className="w-full flex gap-3">
          <Button className="w-full h-12 cursor-pointer" disabled={selectedCount === 0}>
            {selectedCount > 0 ? `${selectedCount}개 상품 주문하기` : "상품을 선택해주세요"}
          </Button>
        </div>
      </div>
    </div>
  );
}
