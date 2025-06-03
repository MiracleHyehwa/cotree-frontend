import { CartItem } from "../model";
import CartProductItem from "./cartProductItem";

interface CartProductListProps {
  items: (CartItem & { selected: boolean })[];
  onSelectItem: (id: number, checked: boolean | "indeterminate") => void;
  onDeleteItem: (id: number) => void;
}

export default function CartProductList({ items, onSelectItem, onDeleteItem }: CartProductListProps) {
  return (
    <div>
      {items.map((item) => (
        <CartProductItem
          key={item.id}
          item={item}
          onSelect={(checked) => onSelectItem(item.id, checked)}
          onDelete={() => onDeleteItem(item.id)}
        />
      ))}
    </div>
  );
}
