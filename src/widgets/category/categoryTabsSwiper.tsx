import { useState } from "react";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@/shared/components/ui/button";

const CATEGORIES = [
  { key: "ALL", label: "전체" },
  { key: "FRUIT_VEGETABLE", label: "과일과 채소" },
  { key: "CROP", label: "곡물과 견과" },
  { key: "FISH", label: "생선과 해산물" },
  { key: "NUTRITION", label: "영양제" },
  { key: "MEAT", label: "육류와 달걀" },
  { key: "RICE", label: "밥과 국, 면" },
  { key: "SIDE_DISH", label: "밑반찬" },
  { key: "SAUCE", label: "양념과 오일, 통조림" },
  { key: "BREAD_CHEEZE", label: "빵과 치즈" },
  { key: "SNACK", label: "과자와 초콜릿, 캔디" },
];

export default function CategoryTabsSwiper() {
  const [active, setActive] = useState("ALL");

  return (
    <div className="sticky left-0 right-0 z-20 overflow-x-auto top-[52px] h-[48px] bg-background">
      <div className="relative flex w-full flex-col items-center justify-center pt-px">
        <div
          role="presentation"
          className="overflow-x-auto overflow-y-hidden scrollbar-hide flex w-full shrink-0 flex-row items-start relative px-4"
        >
          <Swiper spaceBetween={8} slidesPerView="auto" freeMode modules={[FreeMode]} className="w-full">
            {CATEGORIES.map((category, i) => {
              const isActive = active === category.key;
              return (
                <SwiperSlide key={i} className="!w-auto !flex-shrink-0 pointer-events-none">
                  <div onClick={() => setActive(category.key)} className="pointer-events-auto cursor-pointer">
                    <Button
                      className={`
                          pointer-events-none select-none cursor-pointer
                          hover:bg-background px-3 py-1 h-8 text-xs border transition-all font-normal whitespace-nowrap
                          ${
                            isActive
                              ? "border-primary text-foreground bg-background"
                              : "border-border foreground text-muted-foreground bg-background"
                          }
                        `}
                    >
                      {category.label}
                    </Button>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
