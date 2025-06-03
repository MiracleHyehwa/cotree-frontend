import { useState } from "react";
import { HeaderHomeLayout } from "@/shared/layout";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { CartEmptyState, CartOrderActionBar } from "@/features/cart/ui";
import { CartProductList, CartSummary } from "@/entities/cart/ui";
import { CartItem } from "@/entities/cart/model";

const initialCartItems = [
  {
    id: 1,
    image: "https://placehold.co/120x120?text=유기농+사과",
    name: "유기농 사과 1kg",
    brand: "로컬팜",
    price: 5600,
    discount: 600,
    quantity: 1,
    isGreen: true,
  },
  {
    id: 2,
    image: "https://placehold.co/120x120?text=방울토마토",
    name: "유기농 방울토마토 500g",
    brand: "그린팜",
    price: 4200,
    discount: 200,
    quantity: 2,
    isGreen: true,
  },
  {
    id: 3,
    image: "https://placehold.co/120x120?text=바나나",
    name: "바나나 1송이",
    brand: "프레시마트",
    price: 3500,
    discount: 0,
    quantity: 1,
    isGreen: false,
  },
];

export default function ShoppingCartPage() {
  const [cartItems, setCartItems] = useState<(CartItem & { selected: boolean })[]>(
    initialCartItems.map((item) => ({ ...item, selected: true }))
  );

  const isAllSelected = cartItems.length > 0 && cartItems.every((item) => item.selected);
  const selectedCount = cartItems.filter((item) => item.selected).length;

  const handleSelectAll = (checked: boolean | "indeterminate") => {
    setCartItems((items) => items.map((item) => ({ ...item, selected: checked === true })));
  };

  const handleSelectItem = (id: number, checked: boolean | "indeterminate") => {
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, selected: checked === true } : item)));
  };

  const handleDeleteItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const selectedItems = cartItems.filter((item) => item.selected);
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDiscount = selectedItems.reduce((sum, item) => sum + item.discount * item.quantity, 0);
  const finalTotalPrice = totalPrice - totalDiscount;
  const totalPoints = selectedItems.reduce((sum, item) => {
    const point = item.isGreen ? Math.floor((item.price - item.discount) * 0.05 * item.quantity) : 0;
    return sum + point;
  }, 0);

  return (
    <HeaderHomeLayout title="장바구니">
      {cartItems.length === 0 ? (
        <CartEmptyState />
      ) : (
        <div className="w-full max-w-limit">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <Checkbox checked={isAllSelected} onCheckedChange={handleSelectAll} />
              <span className="text-sm font-medium">전체상품 ({cartItems.length})</span>
            </div>
          </div>

          <CartProductList items={cartItems} onSelectItem={handleSelectItem} onDeleteItem={handleDeleteItem} />

          <CartSummary
            totalPrice={totalPrice}
            totalDiscount={totalDiscount}
            finalTotalPrice={finalTotalPrice}
            totalPoints={totalPoints}
          />

          <CartOrderActionBar selectedCount={selectedCount} />
        </div>
      )}
    </HeaderHomeLayout>
  );
}
