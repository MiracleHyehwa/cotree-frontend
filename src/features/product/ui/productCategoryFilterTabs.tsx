import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { CATEGORIES } from "../constants";
import { Link, useSearchParams } from "react-router-dom";

export default function ProductCategoryFilterTabs() {
  const [searchParams] = useSearchParams();
  const current = searchParams.get("type") || "ALL";

  return (
    <div className="sticky left-0 right-0 z-20 overflow-x-auto top-[52px] h-[48px] bg-background">
      <div className="relative flex w-full flex-col items-center justify-center pt-px">
        <div
          role="presentation"
          className="overflow-x-auto overflow-y-hidden scrollbar-hide flex w-full shrink-0 flex-row items-start relative px-4"
        >
          <Swiper spaceBetween={8} slidesPerView="auto" freeMode modules={[FreeMode]} className="w-full">
            {CATEGORIES.map((category) => {
              const isActive = current === category.key;

              return (
                <SwiperSlide key={category.key} className="!w-auto !flex-shrink-0 pointer-events-none">
                  <Link to={`/category?type=${category.key}`} className="pointer-events-auto">
                    <div
                      className={`flex items-center justify-centerpointer-events-none select-none cursor-pointer px-3 py-1 h-8 text-xs border transition-all font-normal whitespace-nowrap rounded-full
                        ${
                          isActive
                            ? "border-primary text-foreground bg-background"
                            : "border-border foreground text-muted-foreground bg-background"
                        }
                      `}
                    >
                      {category.label}
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
