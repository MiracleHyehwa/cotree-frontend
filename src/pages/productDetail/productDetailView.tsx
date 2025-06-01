import { ProductDetailContent, ProductImageSlider, ProductMetaInfo, ProductSummaryBlock } from "@/entities/product/ui";
import { ProductPurchaseActionBar, ProductPurchaseDrawer } from "@/features/product/ui";

const product = {
  id: 1,
  code: "FD303118999",
  name: "[오늘출발] 친환경 국산 사과즙 100%",
  subtitle: "무가당 · 무설탕 · 무방부제 / 착즙 생과일",
  origin: "국산",
  price: 120000,
  discount: 20050,
  isGreen: "Y",
  brand: {
    id: 10,
    name: "자연애",
    brandImage: "https://dummyimage.com/60x60/aaffaa/000&text=자연애",
    description: "몸에 좋은 자연 그대로의 식품을 연구하는 친환경 브랜드",
  },
  images: [
    "https://dummyimage.com/750x1000/ffffe0/000&text=thumbnail",
    "https://dummyimage.com/750x1000/fff0e0/000&text=성분표+및+디테일1",
    "https://dummyimage.com/750x1000/fff8f0/000&text=제품+리얼컷",
  ],
  delivery: {
    info: "결제일 기준 1일 이내 출고 (주말/공휴일 제외)",
  },
  points: "120P 적립",
  details: [
    { type: "text", content: "🍎 프리미엄 국산 사과만을 엄선하여 착즙한 100% 순수 사과즙입니다." },
    { type: "text", content: "무가당, 무설탕, 무방부제로 자연 그대로의 맛을 느낄 수 있습니다." },
    { type: "image", content: "https://dummyimage.com/750x400/f0f8ff/000&text=사과+농장+직송" },
    { type: "text", content: "🏭 HACCP 인증을 받은 청결한 시설에서 위생적으로 생산됩니다." },
    { type: "text", content: "📦 냉장 보관하여 신선함을 유지하며, 개봉 후에는 빠른 시일 내에 드시기 바랍니다." },
    { type: "image", content: "https://dummyimage.com/750x400/fff5ee/000&text=HACCP+인증서" },
    { type: "text", content: "🌱 친환경 농법으로 재배한 사과를 사용하여 몸에도 환경에도 좋습니다." },
    { type: "text", content: "💡 아침 공복에 드시거나 운동 후 수분 보충용으로 최적입니다." },
    { type: "image", content: "https://dummyimage.com/750x400/f5fff5/000&text=영양성분표" },
  ],
};

export default function ProductDetailView() {
  return (
    <>
      <div className="w-full max-w-limit mx-auto bg-background pb-12">
        <ProductImageSlider images={product.images} isGreen={product.isGreen} />
        <div className="px-4 py-6">
          <ProductSummaryBlock product={product} />
          <div className="h-px bg-border my-4" />
          <ProductMetaInfo code={product.code} origin={product.origin} deliveryInfo={product.delivery.info} />
          <div className="h-px bg-border my-4" />
          <ProductDetailContent details={product.details as Array<{ type: "text" | "image"; content: string }>} />
        </div>
      </div>
      <ProductPurchaseActionBar product={product}>
        {({ open, setOpen, product }) => <ProductPurchaseDrawer open={open} setOpen={setOpen} product={product} />}
      </ProductPurchaseActionBar>
    </>
  );
}
