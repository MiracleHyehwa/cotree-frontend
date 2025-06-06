import { Button } from "@/shared/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CartEmptyState() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground text-sm w-full max-w-limit">
      <ShoppingCart className="w-10 h-10 mb-4 text-gray-400" />
      <p>장바구니에 담긴 상품이 없습니다.</p>
      <Button className="mt-4 cursor-pointer" onClick={() => navigate("/")}>
        쇼핑하러 가기
      </Button>
    </div>
  );
}
