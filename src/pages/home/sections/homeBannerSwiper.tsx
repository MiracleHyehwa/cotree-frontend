import { EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const banners = [
  "/banner/banner01.jpg",
  "/banner/banner02.jpg",
  "/banner/banner03.jpg",
  "/banner/banner04.jpg",
  "/banner/banner05.jpg",
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
          <SwiperSlide key={idx} className="w-full max-h-[500px] bg-background rounded-lg overflow-hidden shadow-lg">
            <img src={banner} className="w-full h-full object-cover" alt={`slide-${idx}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
