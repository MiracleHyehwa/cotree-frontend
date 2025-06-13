import { ProductDetailItem } from "@/entities/product/model";

interface ProductDetailDescriptionProps {
  details: ProductDetailItem[];
}

export default function ProductDetailDescription({ details }: ProductDetailDescriptionProps) {
  return (
    <div className="space-y-3 mt-4">
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
