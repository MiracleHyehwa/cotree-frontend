import { useCategories } from "@/entities/category/api/hooks";
import { getCategoryImageUrl } from "@/entities/category/libs/categoryImageMap";
import { Link } from "react-router-dom";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function HomeCategorySwiper() {
  const { data: categories } = useCategories();
  return (
    <div className="w-full max-w-limit mx-auto px-4 py-6">
      <Swiper modules={[FreeMode]} slidesPerView="auto" freeMode className="w-full">
        {categories.map((category, idx) => (
          <SwiperSlide key={idx} className="!w-20 text-center">
            <Link to={`/category?type=${category.id}`} className="flex flex-col items-center" target="_self">
              <img
                src={getCategoryImageUrl(category.id)}
                alt={category.name}
                className="w-16 h-16 mb-2 rounded-full border border-gray-200 object-contain"
              />
              <span className="text-sm font-medium line-clamp-1 w-full text-center">{category.name}</span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
