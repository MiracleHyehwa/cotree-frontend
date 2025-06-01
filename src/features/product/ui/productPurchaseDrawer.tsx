import { useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/shared/components/ui/drawer";
import { Button } from "@/shared/components/ui/button";

interface ProductPurchaseDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  product: {
    name: string;
    price: number;
    discount: number;
  };
}

export default function ProductPurchaseDrawer({ open, setOpen, product }: ProductPurchaseDrawerProps) {
  const [quantity, setQuantity] = useState(1);
  const finalPrice = product.price - product.discount;

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="max-w-limit mx-auto w-full">
        <DrawerTitle className="sr-only">{product.name}</DrawerTitle>
        <DrawerDescription className="sr-only">상품 구매 수량 선택</DrawerDescription>

        <DrawerHeader className="px-4 pt-4 pb-0 relative">
          <Button
            onClick={() => setOpen(false)}
            variant="link"
            className="absolute right-4 top-4 w-6 h-6 p-0 text-muted-foreground hover:text-foreground"
          >
            ✕
          </Button>
        </DrawerHeader>

        <div className="px-4 pb-6 space-y-6">
          <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                variant="link"
                className="w-8 h-8 p-0 text-lg"
              >
                −
              </Button>
              <span className="text-lg font-medium min-w-[20px] text-center">{quantity}</span>
              <Button onClick={() => setQuantity((q) => q + 1)} variant="link" className="w-8 h-8 p-0 text-lg">
                +
              </Button>
            </div>
            <div className="text-xl font-bold text-foreground">{finalPrice.toLocaleString()}원</div>
          </div>

          <div className="flex justify-between pt-4 border-t border-border">
            <span className="text-base text-muted-foreground">총 상품 금액</span>
            <span className="text-2xl font-bold text-foreground">{(finalPrice * quantity).toLocaleString()}원</span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4">
            <Button className="h-12 text-base font-medium" onClick={() => setOpen(false)}>
              바로 구매
            </Button>
            <Button className="h-12 rounded-lg border border-border bg-background text-foreground" variant="link">
              장바구니 담기
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
