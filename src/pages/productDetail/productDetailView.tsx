import {
  ProductDetailLayout,
  ProductImageSlider,
  ProductPurchaseActionBar,
  ProductPurchaseBottomSheet,
} from "@/features/product/ui";
import { Navigate, useParams } from "react-router-dom";
import { useProductDetail } from "@/entities/product/api/hooks";

export default function ProductDetailView() {
  const { id } = useParams();
  const validId = id ?? "";
  const { data: product } = useProductDetail(validId);

  if (!id) return <Navigate to="/not-found" replace />;

  return (
    <>
      <ProductImageSlider images={[product.thumbnailImage]} isGreen={product.isGreen} />
      <ProductDetailLayout>
        <ProductDetailLayout.Summary product={product} />
        <ProductDetailLayout.Divider />
        <ProductDetailLayout.MetaInfo
          code={product.id}
          origin={product.origin}
          deliveryInfo={"결제일 기준 1일 이내 출고 (주말/공휴일 제외)"}
        />
        <ProductDetailLayout.Divider />
        <ProductDetailLayout.Description details={product.description} />
      </ProductDetailLayout>

      <ProductPurchaseActionBar product={product}>
        {({ open, setOpen, product }) => <ProductPurchaseBottomSheet open={open} setOpen={setOpen} product={product} />}
      </ProductPurchaseActionBar>
    </>
  );
}
