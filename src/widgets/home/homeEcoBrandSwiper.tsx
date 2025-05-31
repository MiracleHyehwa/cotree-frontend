import { Badge } from "@/shared/components/ui/badge";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ecoHighlights = [
  {
    bannerImage: "https://placehold.co/400x400/orange/white?text=로컬팜",
    brand: "로컬팜",
    title: "무농약 사과 5입",
    subtitle: "건강한 자연의 맛",
    products: [
      {
        image: "https://placehold.co/120x120?text=사과1",
        brand: "로컬팜",
        title: "친환경 사과 500g",
        discount: "20%",
        price: "5,600원",
      },
      {
        image: "https://placehold.co/120x120?text=사과2",
        brand: "로컬팜",
        title: "무농약 사과즙 1박스",
        discount: "15%",
        price: "8,900원",
      },
      {
        image: "https://placehold.co/120x120?text=사과3",
        brand: "로컬팜",
        title: "냉장 유기농 사과칩",
        discount: "10%",
        price: "6,400원",
      },
    ],
  },
  {
    bannerImage: "https://placehold.co/400x400/blue/white?text=로컬팜",
    brand: "로컬팜",
    title: "무농약 사과 5입",
    subtitle: "건강한 자연의 맛",
    products: [
      {
        image: "https://placehold.co/120x120?text=사과1",
        brand: "로컬팜",
        title: "친환경 사과 500g",
        discount: "20%",
        price: "5,600원",
      },
      {
        image: "https://placehold.co/120x120?text=사과2",
        brand: "로컬팜",
        title: "무농약 사과즙 1박스",
        discount: "15%",
        price: "8,900원",
      },
      {
        image: "https://placehold.co/120x120?text=사과3",
        brand: "로컬팜",
        title: "냉장 유기농 사과칩",
        discount: "10%",
        price: "6,400원",
      },
    ],
  },
];

export default function HomeEcoBrandSwiper() {
  return (
    <div className="w-full max-w-limit mx-auto px-4">
      <h2 className="text-lg font-bold mb-4">🌱 지구를 생각하는 브랜드</h2>
      <Swiper modules={[Navigation]} slidesPerView={1} spaceBetween={16} navigation className="w-full">
        {ecoHighlights.map((highlight, idx) => (
          <SwiperSlide key={idx} className="w-full flex-shrink-0">
            <div className="bg-white shadow overflow-hidden">
              <div className="relative">
                <img src={highlight.bannerImage} alt={highlight.title} className="w-full h-48 object-cover" />

                <div className="absolute top-3 left-3 flex flex-col gap-1 text-white text-left">
                  <Badge className="font-bold text-xs">{highlight.brand}</Badge>
                </div>
              </div>

              <div className="divide-y">
                {highlight.products.map((product, i) => (
                  <div key={i} className="flex gap-4 py-4 not-[]:items-center">
                    <img src={product.image} alt={product.title} className="w-16 h-16 rounded object-cover border" />
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-foreground">{product.brand}</div>
                      <div className="text-sm text-muted-foreground truncate">{product.title}</div>
                      <div className="text-sm mt-1">
                        <span className="text-primary font-bold">{product.discount}</span>
                        <span className="text-foreground f0nt-bold ml-1">{product.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
