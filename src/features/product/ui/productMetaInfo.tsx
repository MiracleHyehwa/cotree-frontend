interface ProductMetaInfoProps {
  code: number;
  origin: string;
  deliveryInfo: string;
}

const formatProductCode = (code: number): string => {
  const prefix = "PD";
  const base = code.toString(36).toUpperCase();
  const seed = (code * 7919).toString(36).toUpperCase();
  const combined = prefix + base + seed;
  return combined.slice(0, 12).padEnd(10, "X");
};

export default function ProductMetaInfo({ code, origin, deliveryInfo }: ProductMetaInfoProps) {
  const displayCode = formatProductCode(code);

  return (
    <div className="space-y-3 text-sm">
      <div className="flex justify-between">
        <span className="text-muted-foreground">상품코드</span>
        <span className="text-foreground">{displayCode}</span>
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
