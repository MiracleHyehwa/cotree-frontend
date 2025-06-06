import { ReactNode } from "react";
import { ProductDetailDescription, ProductMetaInfo, ProductSummary } from "@/features/product/ui";

interface ProductDetailLayoutProps {
  children: ReactNode;
}

export default function ProductDetailLayout({ children }: ProductDetailLayoutProps) {
  return (
    <div className="w-full max-w-limit mx-auto bg-background pb-12">
      <div className="px-4 py-6 space-y-4">{children}</div>
    </div>
  );
}

ProductDetailLayout.Summary = function Summary(props: React.ComponentProps<typeof ProductSummary>) {
  return <ProductSummary {...props} />;
};

ProductDetailLayout.MetaInfo = function MetaInfo(props: React.ComponentProps<typeof ProductMetaInfo>) {
  return <ProductMetaInfo {...props} />;
};

ProductDetailLayout.Description = function Content(props: React.ComponentProps<typeof ProductDetailDescription>) {
  return <ProductDetailDescription {...props} />;
};

ProductDetailLayout.Divider = function Divider() {
  return <div className="h-px bg-border my-4" />;
};
