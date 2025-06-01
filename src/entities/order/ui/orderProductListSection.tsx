interface OrderProduct {
  id: number;
  name: string;
  image: string;
  brand: string;
  option: string;
  price: number;
  quantity: number;
}

interface OrderProductListSectionProps {
  products: OrderProduct[];
}

export default function OrderProductListSection({ products }: OrderProductListSectionProps) {
  return (
    <section className="space-y-3">
      <h2 className="font-semibold text-lg">주문상품</h2>
      {products.map((product, index) => (
        <div key={product.id} className={`flex gap-4 pt-4 ${index !== 0 ? "border-t border-border" : ""}`}>
          <img src={product.image} alt={product.name} className="w-24 aspect-square object-cover rounded" />
          <div className="flex-1 text-sm">
            <div className="text-muted-foreground mb-1">{product.brand}</div>
            <div className="font-semibold">{product.name}</div>
            <div className="text-xs text-muted-foreground mt-1">{product.option}</div>
            <div className="mt-2 font-bold text-base">
              {product.price.toLocaleString()}원 / {product.quantity}개
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
