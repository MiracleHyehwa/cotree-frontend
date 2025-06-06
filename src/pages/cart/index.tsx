import { useNavigate } from "react-router-dom";
import { HeaderHomeLayout } from "@/shared/layout";
import { CartProvider } from "@/features/cart/context";
import { CartContent } from "@/features/cart/ui";

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

export default function CartPage() {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate("/order/1");
  };

  return (
    <HeaderHomeLayout title="장바구니">
      <CartProvider initialItems={initialCartItems}>
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
    </HeaderHomeLayout>
  );
}
