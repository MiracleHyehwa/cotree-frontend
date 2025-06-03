import { CartItem } from "@/entities/cart/model";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface CartProductItemProps {
  item: CartItem & { selected: boolean };
  onSelect: (checked: boolean | "indeterminate") => void;
  onDelete: () => void;
}

export default function CartProductItem({ item, onSelect, onDelete }: CartProductItemProps) {
  const finalPrice = item.price - item.discount;
  const point = item.isGreen ? Math.floor(finalPrice * 0.05 * item.quantity) : 0;

  return (
    <div className="border-b px-4 py-4">
      <div className="flex items-start gap-4">
        <Checkbox checked={item.selected} onCheckedChange={onSelect} className="shrink-0" />

        <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-md border shrink-0" />

        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            {item.isGreen && <Badge className="text-xs bg-primary text-primary-foreground">친환경</Badge>}
            <span className="text-sm font-semibold text-foreground">{item.brand}</span>
          </div>

          <Link to={`/product/${item.id}`} className="block">
            <div className="text-sm font-medium text-foreground leading-snug line-clamp-2 hover:underline">
              {item.name}
            </div>
          </Link>

          <div className="text-xs text-muted-foreground">수량: {item.quantity}</div>

          <div className="mt-1">
            <div className="text-base font-bold text-foreground">{(finalPrice * item.quantity).toLocaleString()}원</div>
            {item.discount > 0 && (
              <div className="text-xs text-gray-400 line-through">
                {(item.price * item.quantity).toLocaleString()}원
              </div>
            )}
          </div>

          {item.isGreen && (
            <div className="text-xs text-emerald-600 font-medium mt-1">
              🌿 그린포인트 {point.toLocaleString()}P 적립 예정
            </div>
          )}
        </div>

        <Button size="icon" variant="link" className="shrink-0 mt-1 cursor-pointer" onClick={onDelete}>
          <Trash2 size={16} className="cursor-pointer" />
        </Button>
      </div>
    </div>
  );
}
