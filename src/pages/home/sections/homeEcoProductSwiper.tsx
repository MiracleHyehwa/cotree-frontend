import { useEcoProducts } from "@/entities/product/api/hooks";
import { Product } from "@/entities/product/model";
import { Badge } from "@/shared/components/ui/badge";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

function chunk<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

function formatProductPrice(
  product: Product,
  { discountClass = "", priceClass = "" }: { discountClass?: string; priceClass?: string } = {}
) {
  if (product.discountRate > 0) {
    return (
      <>
        <span className={`${discountClass} font-bold`}>{product.discountRate}%</span>
        <span className={`${priceClass} font-bold ml-1`}>{product.salePrice.toLocaleString()}원</span>
      </>
    );
  }

  return <span className={`${priceClass} font-bold`}>{product.price.toLocaleString()}원</span>;
}
export default function HomeEcoProductSwiper() {
  const { data: ecoProducts } = useEcoProducts();
  const productGroups = chunk(ecoProducts, 4);

  return (
    <div className="w-full max-w-limit mx-auto px-4">
      <h2 className="text-lg font-bold mb-4">🌱 친환경 상품</h2>

      <Swiper modules={[Navigation]} slidesPerView={1} spaceBetween={16} navigation className="w-full">
        {productGroups.map((group, idx) => {
          const [main, ...subs] = group;

          return (
            <SwiperSlide key={idx} className="w-full flex-shrink-0">
              <div className="bg-background shadow overflow-hidden">
                {main && (
                  <Link to={`/product/${main.id}`} className="relative w-full h-48 block">
                    <img src={main.thumbnailImage} alt={main.name} className="w-full h-full object-cover" />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

                    <div className="absolute top-3 left-3 z-10">
                      <Badge className="text-xs font-semibold">친환경</Badge>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <div className="text-xs font-medium opacity-80">{main.brandName}</div>
                      <div className="text-base font-bold">{main.name}</div>
                      {formatProductPrice(main, {
                        discountClass: "text-primary",
                        priceClass: "text-white",
                      })}
                    </div>
                  </Link>
                )}

                <div className="divide-y">
                  {subs.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="flex gap-4 py-4 items-center hover:bg-accent transition-colors"
                    >
                      <img
                        src={product.thumbnailImage}
                        alt={product.name}
                        className="w-16 h-16 rounded object-cover border"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-foreground">{product.brandName}</div>
                        <div className="text-sm text-muted-foreground truncate">{product.name}</div>
                        <div className="text-sm mt-1">
                          {formatProductPrice(product, {
                            discountClass: "text-primary",
                            priceClass: "text-foreground",
                          })}
                        </div>
                      </div>
                    </Link>
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
