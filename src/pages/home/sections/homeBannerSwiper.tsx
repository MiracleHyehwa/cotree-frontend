import { EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const banners = [
  "/banner/banner01.webp",
  "/banner/banner02.webp",
  "/banner/banner03.webp",
  "/banner/banner04.webp",
  "/banner/banner05.webp",
];

export default function HomeBannerSwiper() {
  return (
    <div className="w-full max-w-limit mx-auto px-4">
      <Swiper
        modules={[EffectCoverflow]}
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        loop
        className="swiper-coverflow"
        coverflowEffect={{
          rotate: 70,
          stretch: 0,
          depth: 150,
          modifier: 1,
          slideShadows: false,
        }}
      >
        {banners.map((banner, idx) => (
          <SwiperSlide className="w-full aspect-[13/12] bg-background rounded-lg overflow-hidden shadow-lg relative">
            <img
              src={banner}
              alt={`slide-${idx}`}
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
