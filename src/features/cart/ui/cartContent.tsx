import { ReactNode } from "react";
import { useCartContext } from "@/features/cart/hooks";
import { CartEmptyState, CartSummary } from "@/features/cart/ui";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Button } from "@/shared/components/ui/button";
import { Trash2 } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { Link } from "react-router-dom";
import { useDeleteCartItem } from "@/entities/cart/api/hooks";
import { setOrderSession, toOrderItemFromCart } from "@/entities/order/lib";
import { calculateGreenReward } from "@/shared/lib/greenpoint";

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
  const { mutate: mutateDeleteCartItem } = useDeleteCartItem();
  const { cartItems, setCartItems } = useCartContext();

  const handleSelectItem = (basketItemId: number, checked: boolean | "indeterminate") => {
    setCartItems((prev) =>
      prev.map((item) => (item.basketItemId === basketItemId ? { ...item, selected: checked === true } : item))
    );
  };

  return (
    <>
      {cartItems.map((item) => {
        const {
          basketItemId,
          itemId,
          itemName,
          brandName,
          price,
          discount,
          quantity,
          isGreen,
          selected,
          thumbnailImage,
        } = item;
        const finalPrice = price - discount;
        const point = calculateGreenReward(finalPrice * quantity, isGreen);

        return (
          <div key={basketItemId} className="border-b px-4 py-4">
            <div className="flex items-start gap-4">
              <Checkbox
                checked={selected}
                onCheckedChange={(checked) => handleSelectItem(basketItemId, checked)}
                className="shrink-0"
              />

              <img src={thumbnailImage} alt={itemName} className="w-32 h-32 object-cover rounded-md border shrink-0" />

              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  {isGreen === "Y" && <Badge className="text-xs bg-primary text-primary-foreground">친환경</Badge>}
                  <span className="text-sm font-semibold text-foreground">{brandName}</span>
                </div>

                <Link to={`/product/${itemId}`} className="block">
                  <div className="text-sm font-medium text-foreground leading-snug line-clamp-2 hover:underline">
                    {itemName}
                  </div>
                </Link>

                <div className="text-xs text-muted-foreground">수량: {quantity}</div>

                <div className="mt-1">
                  <div className="text-base font-bold text-foreground">
                    {(finalPrice * quantity).toLocaleString()}원
                  </div>
                  {discount > 0 && (
                    <div className="text-xs text-gray-400 line-through">{(price * quantity).toLocaleString()}원</div>
                  )}
                </div>

                {isGreen === "Y" && (
                  <div className="text-xs text-foreground font-medium mt-1">
                    🌿 그린포인트 {point.toLocaleString()}P 적립 예정
                  </div>
                )}
              </div>

              <Button
                size="icon"
                variant="ghost"
                className="shrink-0 mt-1 cursor-pointer"
                onClick={() => mutateDeleteCartItem(basketItemId)}
              >
                <Trash2 size={16} className="cursor-pointer" />
              </Button>
            </div>
          </div>
        );
      })}
    </>
  );
}

function Summary() {
  const { cartItems } = useCartContext();
  const selectedItems = cartItems.filter((item) => item.selected);

  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDiscount = selectedItems.reduce((sum, item) => sum + item.discount * item.quantity, 0);
  const finalTotalPrice = totalPrice - totalDiscount;
  const totalPoints = selectedItems.reduce((sum, item) => {
    const point = item.isGreen === "Y" ? Math.floor((item.price - item.discount) * 0.01 * item.quantity) : 0;
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

    const orderItems = selectedItems.map(toOrderItemFromCart);
    setOrderSession(orderItems);
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
