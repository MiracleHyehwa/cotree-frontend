import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductPurchaseActionBarProps {
  product: {
    name: string;
    price: number;
    discount: number;
  };
  children?: (state: {
    open: boolean;
    setOpen: (open: boolean) => void;
    product: ProductPurchaseActionBarProps["product"];
  }) => React.ReactNode;
}

export default function ProductPurchaseActionBar({ product, children }: ProductPurchaseActionBarProps) {
  const [open, setOpen] = useState(false);

  const handleOpenDrawer = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setOpen(true);
  };

  return (
    <>
      <div className="w-full max-w-limit fixed bottom-0 left-1/2 -translate-x-1/2 bg-background border-t border-border z-50">
        <div className="max-w-limit mx-auto px-4 py-4">
          <div className="w-full flex gap-3">
            <Button
              className="w-1/4 h-12 rounded-lg border border-border bg-background flex items-center justify-center cursor-pointer"
              variant="link"
            >
              <ShoppingCart className="w-5 h-5 text-muted-foreground" />
            </Button>
            <Button className="w-3/4 h-12" onClick={handleOpenDrawer}>
              구매하기
            </Button>
          </div>
        </div>
      </div>

      {children?.({ open, setOpen, product })}
    </>
  );
}
