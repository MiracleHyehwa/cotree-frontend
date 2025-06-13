import { Badge } from "@/shared/components/ui/badge";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

interface ProductImageSliderProps {
  images: string[];
  isGreen?: string;
}

export default function ProductImageSlider({ images, isGreen }: ProductImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(1);

  return (
    <div className="relative">
      <div className="aspect-square w-full bg-background">
        <Swiper slidesPerView={1} onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex + 1)}>
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img src={img} alt={`상품 이미지 ${idx + 1}`} className="w-full h-full object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute bottom-4 right-4 bg-foreground text-background text-xs px-2 py-1 rounded-full z-10">
          {currentIndex} / {images.length}
        </div>
      </div>
      {isGreen === "Y" && (
        <div className="absolute top-4 left-4 z-10">
          <Badge className="text-xs px-2 py-1">친환경</Badge>
        </div>
      )}
    </div>
  );
}
