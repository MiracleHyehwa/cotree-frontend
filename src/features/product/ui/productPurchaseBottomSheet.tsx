import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/shared/components/ui/drawer";
import { Button } from "@/shared/components/ui/button";
import { ProductDetail } from "@/entities/product/model";
import { Input } from "@/shared/components/ui/input";
import { useAddToCart } from "@/entities/cart/api/hooks";

interface ProductPurchaseBottomSheetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  product: ProductDetail;
}

export default function ProductPurchaseBottomSheet({ open, setOpen, product }: ProductPurchaseBottomSheetProps) {
  const { id, name, price, salePrice, discountRate, quantity: stockQuantity } = product;
  const [quantity, setQuantity] = useState(1);
  const maxQuantity = stockQuantity;
  const { mutate: addToCart } = useAddToCart();

  const navigate = useNavigate();

  const handlePurchase = () => {
    setOpen(false);
    setTimeout(() => {
      navigate("/order");
    }, 300);
  };

  const handleAddToCart = async () => {
    addToCart({ itemId: id, quantity });
    setOpen(false);
  };

  useEffect(() => {
    if (!open) setQuantity(1);
  }, [open]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="max-w-limit mx-auto w-full">
        <DrawerTitle className="sr-only">{name}</DrawerTitle>
        <DrawerDescription className="sr-only">상품 구매 수량 선택</DrawerDescription>

        <DrawerHeader className="px-4 pt-4 pb-0 relative"></DrawerHeader>

        <div className="px-4 pb-6 space-y-6">
          <h3 className="text-lg font-semibold text-foreground">{name}</h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                variant="ghost"
                className="text-base cursor-pointer"
                disabled={quantity <= 1}
              >
                −
              </Button>
              <Input
                inputMode="numeric"
                pattern="[0-9]*"
                value={quantity}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (!Number.isNaN(value)) {
                    setQuantity(Math.max(1, Math.min(maxQuantity, value)));
                  }
                }}
                className="w-16 h-10 text-center text-lg font-medium"
                min={1}
                max={maxQuantity}
              />
              <Button
                onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}
                variant="ghost"
                className=" text-base cursor-pointer"
                disabled={quantity >= maxQuantity}
              >
                +
              </Button>
            </div>

            <div className="text-right">
              <div className="text-xl font-bold text-foreground">{salePrice.toLocaleString()}원</div>
              {discountRate > 0 && (
                <div className="flex items-center gap-2 justify-end text-sm text-muted-foreground">
                  <span className="line-through text-primary">{price.toLocaleString()}원</span>
                  <span>({discountRate}% 할인)</span>
                </div>
              )}
            </div>
          </div>

          {maxQuantity <= 5 && (
            <div className="text-right text-sm text-destructive">최대 {maxQuantity}개까지 구매 가능합니다</div>
          )}

          <div className="flex justify-between pt-4 border-t border-border">
            <span className="text-base text-muted-foreground">총 상품 금액</span>
            <span className="text-2xl font-bold text-foreground">{(salePrice * quantity).toLocaleString()}원</span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4">
            <Button className="h-12 text-base font-medium cursor-pointer" onClick={handlePurchase}>
              바로 구매
            </Button>
            <Button className="h-12 rounded-lg cursor-pointer" variant="outline" onClick={handleAddToCart}>
              장바구니 담기
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
