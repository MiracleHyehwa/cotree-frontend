import { useNavigate } from "react-router-dom";
import { CartProvider } from "@/features/cart/context";
import { CartContent } from "@/features/cart/ui";
import { useCartItems } from "@/entities/cart/api/hooks";

export default function CartView() {
  const navigate = useNavigate();
  const { data: catrItems } = useCartItems();

  const handleOrderClick = () => {
    navigate("/order?source=cart");
  };

  return (
    <CartProvider initialItems={catrItems}>
      <CartContent>
        <CartContent.WhenEmpty>
          <CartContent.Empty />
        </CartContent.WhenEmpty>

        <CartContent.WhenFilled>
          <CartContent.Checkbox />
          <CartContent.List />
          <CartContent.Summary />
          <CartContent.ActionBar onClick={handleOrderClick} />
        </CartContent.WhenFilled>
      </CartContent>
    </CartProvider>
  );
}
