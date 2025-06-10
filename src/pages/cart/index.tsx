import { Suspense } from "react";
import { HeaderHomeLayout } from "@/shared/layout";
import CartView from "./cartView";
import { CartSkeleton } from "@/features/cart/ui";

export default function CartPage() {
  return (
    <HeaderHomeLayout title="장바구니">
      <Suspense fallback={<CartSkeleton />}>
        <CartView />
      </Suspense>
    </HeaderHomeLayout>
  );
}
