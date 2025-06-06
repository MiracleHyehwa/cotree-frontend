import { ReactNode } from "react";
import { useCartContext } from "@/features/cart/hooks";
import { CartEmptyState, CartProductList, CartSummary } from "@/features/cart/ui";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Button } from "@/shared/components/ui/button";

interface CartContentProps {
  children: ReactNode;
}

export default function CartContent({ children }: CartContentProps) {
  return <div className="w-full max-w-limit">{children}</div>;
}

function WhenEmpty({ children }: { children: ReactNode }) {
  const { cartItems } = useCartContext();
  if (cartItems.length > 0) return null;
  return <>{children}</>;
}

function WhenFilled({ children }: { children: ReactNode }) {
  const { cartItems } = useCartContext();
  if (cartItems.length === 0) return null;
  return <>{children}</>;
}

function Empty() {
  return <CartEmptyState />;
}

function CheckboxSlot() {
  const { cartItems, setCartItems } = useCartContext();

  const isAllSelected = cartItems.length > 0 && cartItems.every((item) => item.selected);
  const handleSelectAll = (checked: boolean | "indeterminate") => {
    setCartItems((items) => items.map((item) => ({ ...item, selected: checked === true })));
  };

  return (
    <div className="flex items-center justify-between border-b px-4 py-3">
      <div className="flex items-center gap-2">
        <Checkbox checked={isAllSelected} onCheckedChange={handleSelectAll} />
        <span className="text-sm font-medium">전체상품 ({cartItems.length})</span>
      </div>
    </div>
  );
}

function List() {
  const { cartItems, setCartItems } = useCartContext();

  const handleSelectItem = (id: number, checked: boolean | "indeterminate") => {
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, selected: checked === true } : item)));
  };

  const handleDeleteItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return <CartProductList items={cartItems} onSelectItem={handleSelectItem} onDeleteItem={handleDeleteItem} />;
}

function Summary() {
  const { cartItems } = useCartContext();
  const selectedItems = cartItems.filter((item) => item.selected);

  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDiscount = selectedItems.reduce((sum, item) => sum + item.discount * item.quantity, 0);
  const finalTotalPrice = totalPrice - totalDiscount;
  const totalPoints = selectedItems.reduce((sum, item) => {
    const point = item.isGreen ? Math.floor((item.price - item.discount) * 0.05 * item.quantity) : 0;
    return sum + point;
  }, 0);

  return (
    <CartSummary
      totalPrice={totalPrice}
      totalDiscount={totalDiscount}
      finalTotalPrice={finalTotalPrice}
      totalPoints={totalPoints}
    />
  );
}

function ActionBar({ onClick }: { onClick: () => void }) {
  const { cartItems } = useCartContext();
  const selectedItems = cartItems.filter((item) => item.selected);
  const selectedCount = selectedItems.length;

  const handleClick = () => {
    if (selectedCount === 0) return;
    onClick();
  };

  return (
    <div className="w-full max-w-limit fixed bottom-0 left-1/2 -translate-x-1/2 bg-background border-t border-border z-50">
      <div className="max-w-limit mx-auto px-4 py-4">
        <div className="w-full flex gap-3">
          <Button className="w-full h-12 cursor-pointer" disabled={selectedCount === 0} onClick={handleClick}>
            {selectedCount > 0 ? `${selectedCount}개 상품 주문하기` : "상품을 선택해주세요"}
          </Button>
        </div>
      </div>
    </div>
  );
}

CartContent.WhenEmpty = WhenEmpty;
CartContent.WhenFilled = WhenFilled;
CartContent.Empty = Empty;
CartContent.Checkbox = CheckboxSlot;
CartContent.List = List;
CartContent.Summary = Summary;
CartContent.ActionBar = ActionBar;
