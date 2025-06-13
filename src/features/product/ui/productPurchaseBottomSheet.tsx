import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/shared/components/ui/drawer";
import { Button } from "@/shared/components/ui/button";
import { ProductDetail } from "@/entities/product/model";

interface ProductPurchaseBottomSheetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  product: ProductDetail;
}

export default function ProductPurchaseBottomSheet({ open, setOpen, product }: ProductPurchaseBottomSheetProps) {
  const { name, salePrice, discountRate } = product;
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handlePurchase = () => {
    setOpen(false);
    setTimeout(() => {
      navigate("/order/1");
    }, 300);
  };

  const handleAddToCart = () => {
    setOpen(false);
    setTimeout(() => {
      navigate("/cart");
    }, 300);
  };
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="max-w-limit mx-auto w-full">
        <DrawerTitle className="sr-only">{name}</DrawerTitle>
        <DrawerDescription className="sr-only">상품 구매 수량 선택</DrawerDescription>

        <DrawerHeader className="px-4 pt-4 pb-0 relative"></DrawerHeader>

        <div className="px-4 pb-6 space-y-6">
          <h3 className="text-lg font-semibold text-foreground">{name}</h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                variant="outline"
                className="text-lg cursor-pointer"
              >
                −
              </Button>
              <span className="text-lg font-medium min-w-[20px] text-center">{quantity}</span>
              <Button onClick={() => setQuantity((q) => q + 1)} variant="outline" className=" text-lg cursor-pointer">
                +
              </Button>
            </div>
            <div className="text-xl font-bold text-foreground">{salePrice.toLocaleString()}원</div>
          </div>

          <div className="flex items-center justify-end text-sm text-muted-foreground">({discountRate}% 할인)</div>

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
