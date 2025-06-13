import { useEffect } from "react";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCategories } from "@/entities/category/api/hooks";

export default function ProductCategoryFilterTabs() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const current = searchParams.get("type");

  const { data: categories } = useCategories();

  useEffect(() => {
    if (!current && categories.length > 0) {
      navigate(`/category?type=${categories[0].id}`, { replace: true });
    }
  }, [current, categories, navigate]);

  return (
    <div className="sticky left-0 right-0 z-20 overflow-x-auto top-[52px] h-[48px] bg-background">
      <div className="relative flex w-full flex-col items-center justify-center pt-px">
        <div
          role="presentation"
          className="overflow-x-auto overflow-y-hidden scrollbar-hide flex w-full shrink-0 flex-row items-start relative px-4"
        >
          <Swiper spaceBetween={8} slidesPerView="auto" freeMode modules={[FreeMode]} className="w-full">
            {categories.map((category) => {
              const isActive = current === category.id.toString();

              return (
                <SwiperSlide key={category.id} className="!w-auto !flex-shrink-0 pointer-events-none">
                  <Link to={`/category?type=${category.id}`} className="pointer-events-auto">
                    <div
                      className={`flex items-center justify-centerpointer-events-none select-none cursor-pointer px-3 py-1 h-8 text-xs border transition-all font-normal whitespace-nowrap rounded-full
                        ${
                          isActive
                            ? "border-primary text-foreground bg-background"
                            : "border-border foreground text-muted-foreground bg-background"
                        }
                      `}
                    >
                      {category.name}
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
