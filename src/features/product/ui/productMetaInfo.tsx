interface ProductMetaInfoProps {
  code: number;
  origin: string;
  deliveryInfo: string;
}

export default function ProductMetaInfo({ code, origin, deliveryInfo }: ProductMetaInfoProps) {
  return (
    <div className="space-y-3 text-sm">
      <div className="flex justify-between">
        <span className="text-muted-foreground">상품코드</span>
        <span className="text-foreground">{code}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">원산지</span>
        <span className="text-foreground">{origin}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">배송정보</span>
        <span className="text-foreground">{deliveryInfo}</span>
      </div>
    </div>
  );
}
