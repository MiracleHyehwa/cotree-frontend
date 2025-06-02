import { HeaderHomeLayout } from "@/shared/layout";
import OrderCreateView from "./orderCreateView";

export default function OrderCreatePage() {
  return (
    <HeaderHomeLayout title="주문/결제">
      <OrderCreateView />
    </HeaderHomeLayout>
  );
}
