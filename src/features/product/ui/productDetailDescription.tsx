import "@/features/product/ui/css/productDetailDescription.css";

interface ProductDetailDescriptionProps {
  details: string;
}

export default function ProductDetailDescription({ details }: ProductDetailDescriptionProps) {
  return (
    <div className="space-y-3 mt-4">
      <div dangerouslySetInnerHTML={{ __html: details }} />
    </div>
  );
}
