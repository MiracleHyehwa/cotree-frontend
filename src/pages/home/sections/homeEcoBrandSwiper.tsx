import { Badge } from "@/shared/components/ui/badge";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const ecoProducts = [
  {
    id: 1,
    image: "https://placehold.co/400x400/orange/white?text=친환경+사과",
    title: "친환경 사과 500g",
    subtitle: "무농약으로 키운 자연의 맛",
    price: 5600,
    discount: "20%",
    brand: "로컬팜",
  },
  {
    id: 2,
    image: "https://placehold.co/400x400/red/white?text=사과즙",
    title: "무농약 사과즙 1박스",
    subtitle: "상큼하게 착즙한 자연의 건강",
    price: 8900,
    discount: "15%",
    brand: "로컬팜",
  },
  {
    id: 3,
    image: "https://placehold.co/400x400/green/white?text=유기농+샐러드",
    title: "유기농 샐러드 믹스",
    subtitle: "싱싱한 채소 그대로",
    price: 4300,
    discount: "10%",
    brand: "그린파머스",
  },
  {
    id: 4,
    image: "https://placehold.co/400x400/green/white?text=비건+스낵",
    title: "비건 스낵 3종 세트",
    subtitle: "건강한 간식 선택",
    price: 7200,
    discount: "18%",
    brand: "에코잇",
  },
  {
    id: 5,
    image: "https://placehold.co/400x400/green/white?text=유기농+달걀",
    title: "유기농 방사 달걀 10구",
    subtitle: "동물복지 인증",
    price: 6800,
    discount: "12%",
    brand: "헬씨에그",
  },
  {
    id: 6,
    image: "https://placehold.co/400x400/green/white?text=친환경+쌀",
    title: "친환경 쌀 2kg",
    subtitle: "논에서 바로 온 신선함",
    price: 9500,
    discount: "15%",
    brand: "그린팜",
  },
  {
    id: 7,
    image: "https://placehold.co/400x400/green/white?text=무농약+당근",
    title: "무농약 당근 1kg",
    subtitle: "안심하고 먹을 수 있는 채소",
    price: 3600,
    discount: "10%",
    brand: "로컬팜",
  },
  {
    id: 8,
    image: "https://placehold.co/400x400/green/white?text=친환경+두유",
    title: "친환경 두유 6팩",
    subtitle: "식물성 단백질의 좋은 예",
    price: 7800,
    discount: "17%",
    brand: "그레인웨이",
  },
  {
    id: 9,
    image: "https://placehold.co/400x400/green/white?text=무농약+당근",
    title: "무농약 당근 1kg",
    subtitle: "안심하고 먹을 수 있는 채소",
    price: 3600,
    discount: "10%",
    brand: "로컬팜",
  },
  {
    id: 10,
    image: "https://placehold.co/400x400/green/white?text=친환경+두유",
    title: "친환경 두유 6팩",
    subtitle: "식물성 단백질의 좋은 예",
    price: 7800,
    discount: "17%",
    brand: "그레인웨이",
  },
];

function chunk<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export default function HomeEcoBrandSwiper() {
  const productGroups = chunk(ecoProducts, 4); // [ [0,1,2,3], [4,5,6,7], ... ]

  return (
    <div className="w-full max-w-limit mx-auto px-4">
      <h2 className="text-lg font-bold mb-4">🌱 친환경 상품</h2>

      <Swiper modules={[Navigation]} slidesPerView={1} spaceBetween={16} navigation className="w-full">
        {productGroups.map((group, idx) => {
          const [main, ...subs] = group;

          return (
            <SwiperSlide key={idx} className="w-full flex-shrink-0">
              <div className="bg-white shadow overflow-hidden">
                {main && (
                  <div className="relative w-full h-48">
                    <img src={main.image} alt={main.title} className="w-full h-full object-cover" />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

                    <div className="absolute top-3 left-3 z-10">
                      <Badge className="text-xs font-semibold">🌿 친환경 추천</Badge>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <div className="text-xs font-medium opacity-80">{main.brand}</div>
                      <div className="text-base font-bold">{main.title}</div>
                      <div className="text-sm opacity-90">{main.subtitle}</div>
                      <div className="text-sm mt-1">
                        <span className="text-primary font-bold">{main.discount}</span>
                        <span className="ml-2 font-semibold">{main.price.toLocaleString()}원</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="divide-y">
                  {subs.map((product) => (
                    <div key={product.id} className="flex gap-4 py-4 items-center">
                      <img src={product.image} alt={product.title} className="w-16 h-16 rounded object-cover border" />
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-foreground">{product.brand}</div>
                        <div className="text-sm text-muted-foreground truncate">{product.title}</div>
                        <div className="text-sm mt-1">
                          <span className="text-primary font-bold">{product.discount}</span>
                          <span className="text-foreground font-bold ml-1">{product.price.toLocaleString()}원</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
