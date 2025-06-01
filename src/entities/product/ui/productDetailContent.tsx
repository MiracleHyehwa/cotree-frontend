interface DetailItem {
  type: "text" | "image";
  content: string;
}

interface ProductDetailContentProps {
  details: DetailItem[];
}

export default function ProductDetailContent({ details }: ProductDetailContentProps) {
  return (
    <div className="space-y-4 mt-8">
      <h3 className="font-medium text-foreground">상세정보</h3>
      {details.map((item, index) => {
        if (item.type === "text") {
          return (
            <div key={index} className="text-sm text-foreground leading-relaxed">
              {item.content}
            </div>
          );
        }
        if (item.type === "image") {
          return (
            <div key={index} className="my-2">
              <img src={item.content} alt={`상세 이미지 ${index + 1}`} className="w-full object-cover rounded-lg" />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
